// In your server code: define a method that the client can call
Meteor.methods({
 createEmailAccount: function (emailAddress) {
		check([emailAddress], [String]);

		// Returns document if it is found else nothing
		var status = EmailAccounts.findOne({
			email: emailAddress
		});

		if ( status ) {
			console.log("Email exists returning now");
			return { emailAlreadyExists: true };
		} else {
			var uniqueId = ShortId.generate();

			EmailAccounts.insert({
				email: emailAddress,
				isPrivateKeyDownloaded: false,
				urlId: uniqueId
			});

			var emailMessage = "Click the link to install your private key into your browser local storage. http://easyencryption.meteor.com/install-key/"+uniqueId+" Cheers, Easy Encryption";

			Email.send({
				to: emailAddress,
				from: "easyencryption",
				subject: "Easy Encryption - Private Key Download",
				text: emailMessage
    	});
			return { emailAlreadyExists: false };
		}
  },

  checkIfAccountExists: function(emailAddress) {
		check([emailAddress], [String]);

		// Returns document if it is found else nothing
		var status = EmailAccounts.findOne({
			email: emailAddress
		});

    console.log("Status ", status);

		if ( status ) {
			console.log("Email exists returning now");
			return true;
		} else {
			console.log("Account doesn't exisits.");
			return false;
		}
  },

  getUserPublicKey: function(emailAddress) {
  	check([emailAddress], [String]);

  	var account = EmailAccounts.findOne({
  		email: emailAddress
  	});

  	if ( account ) {
  		console.log( account );
  		return account.publicKey;
  	} else {
  		// Ideally shoudn't happen
  		return {
  			error: "Unable to find public key"
  		};
  	}
  },

  saveEmailMessage: function(userEmail, encryptedSenderEmail, encryptedSubject, encryptedMessage) {
  	check([userEmail, encryptedSenderEmail, encryptedSubject, encryptedMessage], [String]);

  	var account = EmailAccounts.findOne({
  		email: userEmail
  	});

  	if ( account ) {
  		var email = account.email;

  		var status = Messages.insert({
  			userEmail: userEmail,
  			senderEmail: encryptedSenderEmail,
        subject: encryptedSubject,
  			message: encryptedMessage
  		});

  		if ( status ) {
  			console.log("Message Saved");
  			// return {
  			// 	message: "Email Saved"
  			// };
				return true;
  		} else {
  			console.log("Unable to save message");
  			// return {
  			// 	error: "Unable to save message"
  			// };
				throw new Meteor.Error("error-saving", "Unable to save the message.");
  		}
  	} else {
  		console.log("User doesn't exists");
  		// return {
  		// 	error: "User doesn't exists"
  		// };

			throw new Meteor.Error("does-not-exists", "User doesn't exists.");
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
