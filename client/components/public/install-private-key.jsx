InstallPrivateKey = React.createClass({
  // prop validation
  propTypes: {
    token: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired
  },

  doesBrowserSupportLocalStorage() {
    if ( typeof(Storage) !== "undefined" ) {
      return <span className="label label-success">Browser Supported!</span>
    } else {
      return <span className="label label-danger">Browser Not Supported!</span>
    }
  },

  downloadPrivateKey( event ) {
    // Checking if web broswer supports local storage
    if (typeof(Storage) == "undefined") {
      Bert.alert( "Sorry, we don't support your browser. Please use another.", "danger");
      return ;
    }

    const rsa = new RSA({b: 512});
    const token = this.props.token;
    const emailAddress = this.props.email;

    // Generate private/public key pair
    const key = rsa.generateKeyPair();

    // Saving private key to the browser
    const privateKey = key.exportKey("pkcs8");
    const publicKey = key.exportKey("pkcs8-public");
    localStorage.setItem("easyEncodingKey-" + emailAddress, privateKey);

    const savedPrivateKey = localStorage.getItem("easyEncodingKey-" + emailAddress);

    if ( savedPrivateKey ) {
      Meteor.call("savePublicKey", token, publicKey, function(err) {
        if ( err ) {
          if ( err.error == "account-does-not-exists") {
            Bert.alert("Private key has already been installed or account doesn't exists.", "warning");
            // Redirect to homepage?
            return;
          }

          if ( err.error == "unable-to-remove-token" ) {
            Bert.alert("An error has occured.");
            return;
          }

          if ( err.error == "unable-to-save" ) {
            Bert.alert("Unable to save public key");
            return;
          }
        }

        Bert.alert("Private key installed!", "success");
      });
    }
  },
  render() {
    return (
    	<div className="container">
        <h3>Are you sure you want to use this Computer and web browser?</h3>
        <p>
          Once you install your private key, you can ONLY send/view your messages from this computer and web browser.
        </p>
        {this.doesBrowserSupportLocalStorage()} <br />
        <button className="btn btn-default" onClick={this.downloadPrivateKey}>
          Download Private Key
        </button>
    	</div>
    );
  }
});



