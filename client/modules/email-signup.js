let emailSignup = ( options ) => {
  _validate( options.form );
};

let _validate = ( form ) => {
  $( form ).validate( validation() );
};

let validation = () => {
  return {
    rules: {
      emailAddress: {
        required: true,
        email: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      }
    },
    submitHandler() { _handleEmailSignup(); }
  };
};

let _handleEmailSignup = () => {
  let user = {
    email: $( '[name="emailAddress"]' ).val()
  };

  // Alert
  Bert.alert( 'Welcome!' , 'success' );

  // Make call to DB to create user if no error or if email doesn't already exisits
  Meteor.call("createEmailAccount", user.email, function(err, result) {
  	if (err) {
  	  Bert.alert( err.reason , 'danger' );
  	}

  	if ( result.emailAlreadyExists ) {
  		Bert.alert( 'Email address already exists', 'danger' ); 
  	} else {
  		Bert.alert( 'Confirmation email is being sent.', 'success' );
  	}
  });
};

Modules.client.emailSignup = emailSignup;
