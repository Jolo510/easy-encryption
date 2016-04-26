/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/methods/rsa-keys.js                                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////

Meteor.methods({
	/** Check the token id from the download link sent to user via emai
		- Returns the email account of the user that the token id is associated with
	**/
	checkUrlToken: function (token) {
		check([token], [String]);
		var user = EmailAccounts.findOne({
			urlId: token
		});

		if ( user ) {
			if ( user.isPrivateKeyDownloaded ) {
				throw new Meteor.Error("download-denied", "Private key for this user has already been downloaded.");
			} else {
				return user.email;
			}
		} else {
			throw new Meteor.Error("invalid-token", "Invalid download link.");
		}
	},

	/*
 	How can I make this more secure?
 	 	- Right now its only protection is obsecurity of the token
 	 	- Users can only get the unique token through email
 		- Maybe ask them for the email account related to the key? (More secure but more steps for the user)
 		- Can call this Meteor function from the client and change
 		  the public key in the database
 	NOTE:
 		- After using token to store public_key, remove the key/pair value or set to "" or null
 		- So you can no longer access the acount with the token, for security reasons
 		- With this we could probably remove the "isPrivateKeyDownloaded" field
 */
	savePublicKey: function (token, public_key) {
		check([token, public_key], [String]);

		var user = EmailAccounts.findOne({
			urlId: token
		});

		if (user) {
			var updateStatus = EmailAccounts.update({ urlId: token }, { $set: { publicKey: public_key } }, { upsert: false });

			if (updateStatus) {
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

	setPrivateKeyStatus: function (token, isSaved) {
		check([token], [String]);
		check([isSaved], [Boolean]);

		var user = EmailAccounts.findOne({
			urlId: token
		});

		if (user) {
			var updateStatus = EmailAccounts.update({ urlId: token }, { $set: { isPrivateKeyDownloaded: isSaved } }, { upsert: false });

			if (updateStatus) {
				return {
					message: "Private key status set",
					saveSuccessful: true
				};
			} else {
				return {
					message: "Unable to set private key status",
					saveSuccessful: false
				};
			}
		} else {
			return {
				message: "Unable to find user account.",
				saveSuccessful: false
			};
		}
	}
});
