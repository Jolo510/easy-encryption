Messages = new Meteor.Collection( 'messages' );

Messages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Messages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let MessagesSchema = new SimpleSchema({
	"userEmail": {
		type: String,
		label: "The email address associated with the account",
		regEx: SimpleSchema.RegEx.Email,
		optional: false,
		max:50
	},
	"senderEmail": {
		type: String,
		label: "Email of the sender of the messages",
		regEx: SimpleSchema.RegEx.Email,
		optional: true,
		max: 50
	},
	"message": {
		type: String,
		label: "Users public key used for encrypting messages",
		optional: true
	}
});

Messages.attachSchema( MessagesSchema );