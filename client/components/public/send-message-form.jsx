SendMessageForm = React.createClass({
  handleSubmit( event ) {
    event.preventDefault();

    let senderEmail = $( '[name="senderEmail"]' ).val();
    let subject = $( '[name="subject"]' ).val();
    let message = $( '[name="message"]' ).val();

    let emailAddress = this.props.email;

    Meteor.call("getUserPublicKey", emailAddress, function(err, publicKey) {
      if ( err ) {
        Bert.alert("Unable to get the users public key", "danger");
        return;
      }

      if ( !publicKey ) {
        // Handle use case when user hasn't create a key pair yet
        // console.log("Key doesn't exisits");
        Bert.alert("Users public key doesn't exists", "danger");
      }

      var publicEnc = new RSA(publicKey, 'pkcs8-public');
      let encryptedSenderEmail = publicEnc.encrypt(senderEmail, 'base64');
      let encryptedSubject = publicEnc.encrypt(subject, 'base64');
      let encryptedMessage = publicEnc.encrypt(message, 'base64');

      // Private key has to be downloaded before you can send messages. - Cause no public key to encrypt

      Meteor.call("saveEmailMessage", emailAddress, encryptedSenderEmail, encryptedSubject, encryptedMessage, function(err, result) {
        if ( err ) {
          if ( err.error == "error-saving" ) {
            Bert.alert("Unable to send message.", "danger");
            return;
          }

          if ( err.error == "does-not-exists" ) {
            Bert.alert("User doesn't exists", "danger");
            return;
          }

          Bert.alert("An error has occured", "danger");
          return;
        }

        if ( result ) {
          Bert.alert("Message Sent", "success");
          // Clearing input
          $( '[name="senderEmail"]' ).val("");
          $( '[name="subject"]' ).val("");
          $( '[name="message"]' ).val("");
        } else {
          // Unable to send email
          Bert.alert("Unable to send email message", "danger");
        }

      });
    });

  },
  render() {
    return (
      <div className="container">
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
