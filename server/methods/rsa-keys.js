/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/methods/rsa-keys.js                                          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////

Meteor.methods({
	/** Check the token id from the download link sent to user via email
	 *	- Returns the email account of the user that the token id is associated with
	 *  Input: token (String)
	 *  Ouput: None
	 **/
	checkUrlToken: function (token) {
		check([token], [String]);
		var user = EmailAccounts.findOne({
			urlId: token
		});

		if ( user ) {
			if ( !user.urlId ) {
				throw new Meteor.Error("download-denied", "Private key for this user has already been downloaded.");
			} else {
				return user.email;
			}
		} else {
			throw new Meteor.Error("invalid-token", "Invalid download link.");
		}
	},

	/* Note
	 	How can I make this more secure?
	 	 	- Right now its only protection is obsecurity of the token
	 	 	- Users can only get the unique token through email
	 		- Maybe ask them for the email account related to the key? (More secure but more steps for the user)
	 		- Can call this Meteor function from the client and change
	 		  the public key in the database
 	*/

 	/**
 	 * Saves the users public key.
 	 * - The token is the unique id stored in the users document. Used in the URL link sent to the user to download the private key
 	 * - Also, used in the query to find the user and save the public key
 	 * - Removes the urlId from the users document so it's no longer accessible by the urlId
 	 * Input: token (String), public_key (String)
 	 * Output: None
 	 **/
	savePublicKey: function (token, public_key) {
		check([token, public_key], [String]);

		var user = EmailAccounts.findOne({
			urlId: token
		});

		if (!user) {
			throw new Meteor.Error("account-does-not-exists", "User account doesn't exists.");
		}

		// Note: Upsert creates a new document when no document matches the query.
		var updateStatus = EmailAccounts.update({ urlId: token }, { $set: { publicKey: public_key } }, { upsert: false });

		// Remove the urlId from the document so the user is no longer accessible by it
		var removeTokenStatus = EmailAccounts.update({ urlId: token }, { $unset: { urlId: "" } }, { upsert: false });

		if ( !removeTokenStatus ) {
			throw new Meteor.Error("unable-to-remove-token", "Unable to remove url id from user document");
		}

		if ( !updateStatus ) {
			throw new Meteor.Error("unable-to-save", "Unable to save the public key");
		}
	},
});
