Meteor.methods({
	checkUrlToken: function(token) {
		check([token], [String]);
		var user = EmailAccounts.findOne({
			urlId: token
		});

		console.log("Token : " + user);

		if ( user ) {
			if (user.isPrivateKeyDownloaded) {
				// Already downloaded private key
				console.log("User already downloaded private key.");
				return {
					isValidLink: true,
					downloadKey: false
				}
			} else {
				// Private hasn't been downloaded. User downloads private key, then save public key
				console.log("Private key hasn't been downloaded yet.");
				return {
					isValidLink: true,
					downloadKey: true,
					emailAddress: user.email
				}
			}
		} else {
			// No user found. No urlId found. Invalid link
			console.log("Not a valid url link.");
			return { 
				isValidLink: false,
				downloadKey: false
			};
		}
	},

	savePublicKey: function(token, public_key) {
		check([token, public_key], [String]);

		var user = EmailAccounts.findOne({
			urlId: token
		});

		// Email account found
		if (user) {
			var updateStatus = EmailAccounts.update(
				{ urlId: token },
				{ $set: { publicKey: public_key } },
				{ upsert: false }
			);

			console.log("Update Status : ", updateStatus);

			if (updateStatus) {
				return {
					message: "Saved Public Key",
					saveSuccessful: true 
				};
			} else {
				return {
					message: "Unable to save Public Key",
					saveSuccessful: false 
				};
			}
		} else {
			// Account not found
			// return error
			// Need to figure out how to handle this case. Shouldn't happen.
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