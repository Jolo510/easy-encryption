InstallPrivateKey = React.createClass({
  propTypes: {
    token: React.PropTypes.string.isRequired
  },
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    console.log("Token is : " + this.props.token);
    var token = this.props.token;
    
    Meteor.call("checkUrlToken", token, function(err, result) {
    	if (err) return;
    	console.log("isValidUrl : ", result.isValidLink);

    	if (!result.isValidLink) {
    		console.log("Invalid Url.");
    		return;
    	}

    	if (!result.downloadKey) {
    		console.log("Download link no longer active.");
    		return;
    	}

    	// Button to download private key. Asking them if this is the device and browser they want to save it on
  		var rsa = new RSA({b: 512});

  		var key = rsa.generateKeyPair();

    	// Save this key to the user account
   		var publicKey = key.exportKey("pkcs8-public");
   		Meteor.call("savePublicKey", token, publicKey, function(err, results) {
   			if (err) {
   				console.log(err);
   				return;
   			}

   			console.log(results);
   		});

   		// Save this key in local storage
  		var privateKey = key.exportKey("pkcs8"); 

  		// Saving private key to local storage
  		if(typeof(Storage) !== "undefined") {
  		    // Code for localStorage/sessionStorage.
  		    localStorage.setItem("easyEncodingKey-"+result.emailAddress, privateKey);

  		    var pk = localStorage.getItem("easyEncodingKey-"+result.emailAddress);

  		    if (pk) {
  		    	console.log(pk.toString());
  		    	Meteor.call("setPrivateKeyStatus", token, true, function(err, result) {
  		    		if (err) {
  		    			console.log(err);
  		    			return;
  		    		}

  		    		console.log("Result ", result);
  		    	});	    	
  		    } else {
  		    	console.log("Unable to set private key status.");
  		    }
  		} else {
  			console.log("Your browser does not support local storage. There for you can't use this app");
  		}

  		// localStorage.removeItem("easyEncodingKey");

  		// Encoding with public key
  		var publicEnc = new RSA(publicKey, 'pkcs8-public');

  		var eMessage = publicEnc.encrypt("Hello, world! What's good!");

  		console.log("Encrypted Message : ", eMessage);

      console.log("E TYPE ", eMessage.constructor.name);
  		// Importing private key
  		key2 = new RSA(privateKey,'pkcs8');

  		var message = key2.decrypt(eMessage);



    });

    return {

    };
  },
  render() {
    return (
    	<div className="container">
    		<h2>Installing your private key</h2>
    	</div>
    );
  }
});