const publicRedirect = () => {
  if ( Meteor.userId() ) {
    FlowRouter.go( 'index' );
  }
};

const publicRoutes = FlowRouter.group({
  name: 'public',
  triggersEnter: [ publicRedirect ]
});

publicRoutes.route( '/welcome', {
  name: 'welcome',
  action() {
    ReactLayout.render( Default, { yield: <Welcome /> } );
  }
});

publicRoutes.route( '/install-key/:token', {
	name: 'install-key',
	action: function(params) {
    const token = params.token;

    Meteor.call("checkUrlToken", token, function(err, result) {
      if ( err ) {
        // Render Error page
        return;
      }

      if ( !result.isValidLink ) {
        // Invalid Link. Render Invalid link component

        console.log("Invalid Link");
        return;
      }

      if ( !result.downloadKey ) {
        // Download Link is no longer active. Private key has already been downloaded
        // User could potentially visit this page many times without actually generating the private/public key pair
        console.log("Download link no longer active.");
        return;
      }

      // Render Normal Page with button to generate private/public key pair

      if ( result.isValidLink && result.downloadKey ) {
        // Result should contain email address
        const email = result.emailAddress;
        ReactLayout.render( Default, { yield: <InstallPrivateKey token={params.token} email={email} /> } );
        return;
      }
    });
	}
});

publicRoutes.route( '/send/:email', {
  name: 'Send encrypted messages',
  action: function(params) {
    var email = params.email;
    Meteor.call("checkIfAccountExists", email, function(err, result) {
      if ( err ) {
        console.log(err);
        ReactLayout.render( Default, { yield: <Welcome /> } );
        return;
      }
      
      if ( result ) {
        // Account exists
        // Check if public key exists
        Meteor.call("getUserPublicKey", email, function(err, result) {
          if ( err ) {
            console.log("Unable to get public key ", err);
            return;
          }
          if ( result ) {
            ReactLayout.render( Default, { yield: <SendMessageLoader email={params.email} /> } );
          } else {
            // No public key, user didn't create their public/private key pair yet
            FlowRouter.go( '/welcome' );
            Bert.alert("User didn't generate their public key yet!", "warning");            
          }
        });

      } else {
        // Account doesn't exists
        FlowRouter.go( '/welcome' );
        Bert.alert("Account doesn't exists. Create one!", "danger");
      } 
    }); 
  }
});

publicRoutes.route( '/view/:email', {
  name: 'View encrypted messages',
  action: function(params) {
    var email = params.email;
    Meteor.call("checkIfAccountExists", email, function(err, result) {
      if ( err ) {
        console.log(err);
        ReactLayout.render( Default, { yield: <Welcome /> } );
        return;
      }

      if ( result ) {
        Meteor.call("getUserPublicKey", email, function(err, publicKey) {
          if ( publicKey ) {
            // Account exists
            ReactLayout.render( Default, { yield: <ViewMessagesLoader email={params.email} /> } );
          } else {
            // Public key doesn't exists
            FlowRouter.go( '/welcome' );
            Bert.alert("User didn't generate their public key yet!", "warning");            
          }
        });

      } else {
        // Account doesn't exists
        FlowRouter.go( '/welcome' );
        Bert.alert("Account doesn't exists. Create one!", "danger");
      } 
    });
  }
});

// publicRoutes.route( '/view/:email', {
//   name: 'view encrypted messages',
//   action: function(params) {

//   }
// });

// FlowRouter.route('/post/:slug', {
//   action: function(params) {
//     ReactLayout.render(Layout, {
//       content: <Post slug={params.slug} />
//     });
//   }
// });

// Default (the global variable for our layout component)

// publicRoutes.route( '/signup', {
//   name: 'signup',
//   action() {
//     ReactLayout.render( Default, { yield: <Signup /> } );
//   }
// });

// publicRoutes.route( '/login', {
//   name: 'login',
//   action() {
//     ReactLayout.render( Default, { yield: <Login /> } );
//   }
// });

// publicRoutes.route( '/recover-password', {
//   name: 'recover-password',
//   action() {
//     ReactLayout.render( Default, { yield: <RecoverPassword /> } );
//   }
// });

// publicRoutes.route( '/reset-password/:token', {
//   name: 'reset-password',
//   action() {
//     ReactLayout.render( Default, { yield: <ResetPassword /> } );
//   }
// });
