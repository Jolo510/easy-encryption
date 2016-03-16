Meteor.methods({
	checkUrlToken: function(token) {
		check([token], [String]);
		var user = EmailAccounts.findOne({
			urlId: token
		});

		if ( user ) {
			if (user.isPrivateKeyDownloaded) {
				// Already downloaded private key
				console.log("Token : " + token + " User already downloaded private key.");
				return {
					isValidLink: true,
					downloadKey: false
				}
			} else {
				// Private hasn't been downloaded. User downloads private key, then save public key
				console.log("Token : " + token + " Private key hasn't been downloaded yet.");
				return {
					isValidLink: true,
					downloadKey: true,
					emailAddress: user.email
				}
			}
		} else {
			// No user found. No urlId found. Invalid link
			console.log("Token : " + token + " Not a valid url link.");
			return { 
				isValidLink: false,
				downloadKey: false
			};
		}
	},

	/* 
		How can I make this more secure? 
		 	- Right its only protection is obsecurity of the token
		 	- Users can only get the unique token through email
			- Maybe ask them for the email account related to the key? (More secure but more steps for the user)
			- Can call this Meteor function from the client and change
			  the public key in the database
		NOTE:
			- After using token to store public_key, remove the key/pair value or set to "" or null
			- So you can no longer access the acount with the token, for security reasons
			- With this we could probably remove the "isPrivateKeyDownloaded" field
	*/ 
	savePublicKey: function(token, public_key) {
		check([token, public_key], [String]);

		var user = EmailAccounts.findOne({
			urlId: token
		});


		if ( user ) {
			var updateStatus = EmailAccounts.update(
				{ urlId: token },
				{ $set: { publicKey: public_key } },
				{ upsert: false }
			);

			if ( updateStatus ) {
				// Able to save
				return {
					message: "Saved Public Key",
					saveSuccessful: true 
				};
			} else {
				// Unable to save public key using the token as the query
				// Can't think of a use case when this happens
				// If happens, need to set private key status back to false. Think
				return {
					message: "Unable to save Public Key",
					saveSuccessful: false 
				};
			}
		} else {
			// Unable to find user account based off of the token passed in
			// Return Error
			return {
				message: "Unable to find user account.",
				saveSuccessful: false
			};
		}
	},

	setPrivateKeyStatus: function(token, isSaved) {
		check([token], [String]);
		check([isSaved], [Boolean]);

		var user = EmailAccounts.findOne({
			urlId: token
		});

		if (user) {
			var updateStatus = EmailAccounts.update(
				{ urlId: token },
				{ $set: { isPrivateKeyDownloaded: isSaved } },
				{ upsert: false }
			);

			if (updateStatus) {
				return{
					message: "Private key status set",
					saveSuccessful: true 
				}				
			} else {
				return{
					message: "Unable to set private key status",
					saveSuccessful: false 
				}		
			}
		} else {
			return {
				message: "Unable to find user account.",
				saveSuccessful: false
			};
		}
	}
});