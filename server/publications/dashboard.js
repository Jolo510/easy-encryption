Meteor.publish( 'dashboard', function() {
  return People.find();
});

Meteor.publish( 'messages', function(emailAddress) {
	check( emailAddress, String );
	return Messages.find( {userEmail: emailAddress} ) ;
})
