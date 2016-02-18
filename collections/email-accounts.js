EmailAccounts = new Meteor.Collection( 'emailAccounts' );

EmailAccounts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

EmailAccounts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let EmailAccountsSchema = new SimpleSchema({
	"email": {
		type: String,
		label: "The email address associated with the account",
		unique: true,
		regEx: SimpleSchema.RegEx.Email,
		optional: false,
		max:50
	},
	"publicKey": {
		type: String,
		label: "Users public key used for encrypting messages",
		optional: true
	},
	"isPrivateKeyDownloaded": {
		type: Boolean,
		label: "Download status of the private key"
	},
	"urlId": {
		type: String,
		label: "Unique id used for downloading private key",
		unique: true,
		optional: false 
	}
});

EmailAccounts.attachSchema( EmailAccountsSchema );