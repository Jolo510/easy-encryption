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
		optional: false
	},
	"subject": {
		type: String,
		label: "Encrypted Subject from sender",
		optional: true
	},
	"message": {
		type: String,
		label: "Encrypted Messaged from sender",
		optional: true
	},
	"created_at": {
		type: Date,
		label: "Account Added to System",
		autoValue: function() {
			if ( this.isInsert ) {
				return new Date;
			}
		}
	}
});

Messages.attachSchema( MessagesSchema );
