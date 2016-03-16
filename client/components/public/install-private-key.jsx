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
    if ( typeof(Storage) !== "undefined" ) {
      const rsa = new RSA({b: 512});
      const token = this.props.token;
      const emailAddress = this.props.email;

      // Generate private/public key pair
      const key = rsa.generateKeyPair();
      // Saving private key to the browser
      const privateKey = key.exportKey("pkcs8");
      const publicKey = key.exportKey("pkcs8-public");

      // setItem(keyName, keyValue) when passed a key name and value, will add that key to the storage
      // or update that key's value if it already exists
      /* Issue 
        - Check for overriding the private key? 
        - How do I know for sure it saved? Since setItem returns no value
      */
      localStorage.setItem("easyEncodingKey-" + emailAddress, privateKey);

      const savedPrivateKey = localStorage.getItem("easyEncodingKey-" + emailAddress);

      // If exists save.
      /* Issue 
        - Grabbing from local storage after saving there, security issue?
      */
      if ( savedPrivateKey ) {
        // Setting download status of private key to true
        /* Issue
          Do I need to authenticate to call this function?
          Combine the two functions - dependent on each other
            - Setting private key status
            - Saving public key
        */
        Meteor.call("setPrivateKeyStatus", token, true, function(err, result) {
          if ( err ) {
            // Need to display proper message to user
            console.log("Unable to save private key");
            return;
          }

          if ( result.saveSuccessful ) {
            // Save public key
            Meteor.call("savePublicKey", token, publicKey, function( err, result ) {
              if (err) {
                // Unable to save public key
                console.log("Unable to save public key");
                return;
              }

              if ( result.saveSuccessful ) {
                // Saving public key complele
                console.log("Public key saved!");
              } else {
                // Save unsucessful
                console.log(result.message);
                return;
              }
            });
          } else {
            // Either unable to save private key or unable to find user account
            // Translate message to user
            console.log("Error : " + result.message);
          }
        });
      } else {
        // Issue private key to local storage
        // Need to display proper message to user
        console.log("Issue with saving private key to local storage");
        return;
      }
    } else {
      // Doesn't support local storage, can't install private key
      console.log("Your browser doesn't support local storage");

      return;
    }
  },
  render() {
    return (
    	<div className="container">
        <h3>Download your private key for this computer and browser</h3>
        {this.doesBrowserSupportLocalStorage()} <br />
        <button className="btn btn-default" onClick={this.downloadPrivateKey}>
          Download Private Key
        </button>
    	</div>
    );
  }
});



