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
		max:50,
		autoValue: function () {
			if (this.isSet && typeof this.value === "string") {
				return this.value.toLowerCase();
			}
		}
	},
	"publicKey": {
		type: String,
		label: "Users public key used for encrypting messages",
		optional: true
	},
	// "isPrivateKeyDownloaded": {
	// 	type: Boolean,
	// 	label: "Download status of the private key"
	// },
	"urlId": {
		type: String,
		label: "Unique id used for downloading private key",
		unique: true,
		optional: true
	},
	"accountConfirmationCode": {
		type: String,
		label: "Code used to verify if the message sender has an account",
		optional: false,
	},
	"created_at": {
		type: Date,
		label: "Account Added to System",
		autoValue: function() {
			if ( this.isInsert ) {
				return new Date;
			}
		}
	},
	"updated_at": {
		type: Date,
		label: "Account Updated in System",
		autoValue: function() {
			if ( this.isUpdate ) {
				return new Date;
			}
		},
		denyInsert: true,
		optional: true
	}
});

EmailAccounts.attachSchema( EmailAccountsSchema );