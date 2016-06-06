Meteor.methods({
  /**
   *  Creates an account using a users email address
   *  - Checks if the account already exists. If it does, throws an error
   *  - After account creation, sends a email with a link for user to download their private key
   *
   *  Input: Email Address
   *  Output: None
   **/
 createEmailAccount: function (emailAddress) {
		check([emailAddress], [String]);

		var status = EmailAccounts.findOne({
			email: emailAddress
		});

    // If account already exists, throws an error to the client
		if ( status ) {
      throw new Meteor.Error("account-already-exists", "Email address already has an account associated with it.");
		}

    // uniqueId is for the private key download link
		var uniqueId = ShortId.generate();

    // Used for verification when sending messages
    var confirmationCode = ShortId.generate();

		EmailAccounts.insert({
			email: emailAddress,
			urlId: uniqueId,
      accountConfirmationCode: confirmationCode
		});

    // Split this into another function? Sends email with link to download public key
		var emailMessage = "Click the link to install your private key into your browser local storage. https://www.papernotes.co/install-key/"+uniqueId+" Cheers, Easy Encryption";

		Email.send({
			to: emailAddress,
			from: "easyencryption",
			subject: "Easy Encryption - Private Key Download",
			text: emailMessage
  	});
		return ;
  },

  /**
   *  Checks if an email address exists in our system
   *  Input: Email Address
   *  Output: Boolean
   **/
  checkIfAccountExists: function(emailAddress) {
		check([emailAddress], [String]);

		// Returns document if it is found else nothing
		var status = EmailAccounts.findOne({
			email: emailAddress
		});

		if ( status ) {
			return true;
		} else {
			return false;
		}
  },

  /**
   *  Gets the users account confirmation token and encrypts it with the public key
   *  - Meant to be decrytped by the private key associated with the account.
   *  - If the users token is older than 24 hours, a new one is created
   *
   *  Input: Email Address (string)
   *  Output: accountConfirmationToken (string)
   **/
  getUsersEncryptedConfirmationCode: function(emailAddress) {
    check([emailAddress], [String]);

    var senderAccount = EmailAccounts.findOne({
      email: emailAddress
    });

    if ( !senderAccount ) {
      throw new Meteor.Error("account-does-not-exists", "User account doesn't exists.");
    }

    if ( !senderAccount.publicKey ) {
      throw new Meteor.Error("keys-were-not-generated", "Sender account has not generated their private/public keys yet.");
    }

    lastUpdated = senderAccount.updated_at;

    var time24HoursAgo = Math.round(new Date().getTime() / 1000); - (24 * 3600);
    var confirmationCode;

    // If code is older than 24 hours, creates a new code and replaces the old one
    if ( lastUpdated.getTime() < time24HoursAgo ) {
      confirmationCode = ShortId.generate();
      EmailAccounts.update(
        { email: emailAddress },
        { $set: { accountConfirmationCode: confirmationCode } }
      );
    } else {
      confirmationCode = senderAccount.accountConfirmationCode;
    }

    // Encrypts the confirmation code with the users public key
    var RSA = Meteor.npmRequire( 'node-rsa' );
    var publicKey = senderAccount.publicKey;

    var publicEnc = new RSA(publicKey, 'pkcs8-public')
    var encryptedConfirmationKey = publicEnc.encrypt(confirmationCode, 'base64');

    return encryptedConfirmationKey;
  },

  /**
   *  Gets the public key associated an email address
   *  Input: Email Address (String)
   *  Output: Public Key (String)
   **/
  getUserPublicKey: function(emailAddress) {
  	check([emailAddress], [String]);

  	var account = EmailAccounts.findOne({
  		email: emailAddress
  	});

  	if ( account ) {
  		return account.publicKey;
  	} else {
      throw new Meteor.Error("account-does-not-exists", "User account doesn't exists.");
  	}
  },

  /**
   *  Saves the encrypted email
   *  - Compares the confirmation code sent from the client matches
   *
   *  Input: Email Address (String), encrytpedSenderEmail (String), encrytpedSubject (String),
   *    encryptedMessage (String), confirmationCode (String)
   *  Output: None
  **/
  saveEmailMessage: function(userEmail, senderEmail, encryptedSenderEmail, encryptedSubject, encryptedMessage, confirmationCode) {
  	check([userEmail, senderEmail, encryptedSenderEmail, encryptedSubject, encryptedMessage, confirmationCode], [String]);

  	var account = EmailAccounts.findOne({
  		email: senderEmail
  	});

    if ( !account ) {
      throw new Meteor.Error("account-does-not-exists", "User account doesn't exists.");
    }

    var accountConfirmationCode = account.accountConfirmationCode;
    if ( !(accountConfirmationCode == confirmationCode) ) {
      throw new Meteor.Error("invalid-confirmation-code", "Confirmation code is invalid");
    }

		var email = account.email;

		var status = Messages.insert({
			userEmail: userEmail,
			senderEmail: encryptedSenderEmail,
      subject: encryptedSubject,
			message: encryptedMessage
		});

		if ( !status ) {
			throw new Meteor.Error("error-saving", "Unable to save the message.");
		}
  },

  viewEmailMessages: function(userEmail) {
		check([userEmail], [String]);

		var messages = Messages.find({
			userEmail: userEmail
		}).fetch();

		return messages;
  }
});
