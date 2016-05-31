SendMessageForm = React.createClass({
  handleSubmit( event ) {
    event.preventDefault();

    let senderEmail = $( '[name="senderEmail"]' ).val();
    let subject = $( '[name="subject"]' ).val();
    let message = $( '[name="message"]' ).val();
    let emailAddress = this.props.email;

    Meteor.call("getUsersEncryptedConfirmationCode", senderEmail, function(err, encryptedConfirmationCode) {
      if ( err ) {
        if ( err.error == "account-does-not-exists" ) {
          alert("Sender Email doesn't have an account.");
          return;
        }

        alert("Unknown Error..");
        return;
      }

      // Gets users private key from local storage
      let privateKey = localStorage.getItem( "easyEncodingKey-"+senderEmail );

      if ( !privateKey ) {
        alert("Unable to find your private key. Did you enter the correct email address? Or do you have an account with us?");
        return;
      }

      var key = new RSA();
      key.importKey( privateKey, 'pkcs8' );
      var decryptedMessage = key.decrypt( encryptedConfirmationCode, 'base64' );
      validationToken = window.atob( decryptedMessage );

      Meteor.call("getUserPublicKey", emailAddress, function(err, publicKey) {
        if ( err ) {
          if ( err.error == "account-does-not-exists" ) {
            alert("Receiver Email doesn't have an account.");
            return;
          }

          alert("An Error has occurred.");
          return;
        }

        let encryptedSenderEmail, encryptedSubject, encryptedMessage;
        try {
          var publicEnc = new RSA(publicKey, 'pkcs8-public');
          encryptedSenderEmail = publicEnc.encrypt(senderEmail, 'base64');
          encryptedSubject = publicEnc.encrypt(subject, 'base64');
          encryptedMessage = publicEnc.encrypt(message, 'base64');
        } catch(err) {
          // Need to handle this error.
          alert("Unable to save message. Issue with the public key.");
          return;
        }

        Meteor.call("saveEmailMessage", emailAddress, senderEmail, encryptedSenderEmail, encryptedSubject, encryptedMessage, validationToken, function(err) {
          if ( err ) {
            if ( err.error ) {
              alert(err.message);
              return;
            }
            alert("Unknown Error");
          }

          Bert.alert("Message Sent", "success");

          // Clearing input
          $( '[name="senderEmail"]' ).val("");
          $( '[name="subject"]' ).val("");
          $( '[name="message"]' ).val("");
        });
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
          <button type="submit" className="btn btn-success pull-right">Send</button>
        </form>
      </div>
    );
  }
});
