SendMessageForm = React.createClass({
  handleSubmit( event ) {
    event.preventDefault();

    let senderEmail = $( '[name="senderEmail"]' ).val();
    let subject = $( '[name="subject"]' ).val();
    let message = $( '[name="message"]' ).val();

    let emailAddress = this.props.email;

    Meteor.call("getUserPublicKey", emailAddress, function(err, publicKey) {
      if (err) {
        console.log(err);
        console.log("Error geting public key");
        return;
      }

      console.log("Public Key", publicKey);
      if (publicKey) {
        console.log("Key exists");
      } else {
        // Handle use case when user hasn't create a key pair yet
        console.log("Key doesn't exisits");
      }

      var publicEnc = new RSA(publicKey, 'pkcs8-public');

      var encryptedMessage = publicEnc.encrypt(message, 'base64');

      // Private key has to be downloaded before you can send messages. - Cause no public key to encrypt

      console.log("Encrypted Message is", encryptedMessage);
      Meteor.call("saveEmailMessage", emailAddress, senderEmail, encryptedMessage, function(err, result) {
        if ( err ) {
          console.log("There was an error", err);
          return; 
        }

        if ( result ) {
          console.log("Result Exists")
          console.log(result);
        } else {
          console.log("Result doesn't exists");
          console.log(result);
        }

      });
    });

  },
  render() {
    return (
      <div>
      	<h2>Send Message</h2>
        <form id="sendMessage" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="Email">Email Address &nbsp;</label>
            <input
              type="text"
              name="senderEmail"
              className="form-control"
              placeholder="Sender Email Address "
              required />

            <label htmlFor="subject">Subject &nbsp;</label>
            <input 
              type="text"
              name="subject"
              className="form-control"
              placeholder="Subject" />
            <br />
            <label htmlFor="message"> Message &nbsp;</label>
            <textarea className="form-control" name="message" rows="15" placeholder="Enter Message Here" />
          </div>
          <button type="submit" className="btn btn-success pull-right">Submit</button>
        </form>
      </div>
    );
  }
});