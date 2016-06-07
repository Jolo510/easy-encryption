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

  // Make call to DB to create user if no error or if email doesn't already exisits
  Meteor.call("createEmailAccount", user.email, function(err, result) {
  	if (err) {
      if (err.error == "account-already-exists" ) {
        Bert.alert( 'Email address already exists', 'danger' );
        $( '[name="emailAddress"]' ).val( '' );
        return;
      }
      Bert.alert( 'An error has occured', 'danger' );
  	}

  	Bert.alert( 'Confirmation email is being sent.', 'success' );
    $( '[name="emailAddress"]' ).val( '' );
  });
};

Modules.client.emailSignup = emailSignup;
