MessagesTable = React.createClass({
	subject() {
		let privateKey = localStorage.getItem( "easyEncodingKey-"+this.props.message.userEmail );
		var subject = this.props.message.subject; 
		
		// Check if subject exists since it's optional
		if (!subject) {
			return "";
		}

		if (privateKey) {
			var key = new RSA();

			key.importKey( privateKey, 'pkcs8' );

			var decryptedSubject = key.decrypt( subject, 'base64' );

			return window.atob( decryptedSubject );
		} else {
			return subject;
		}
	},
	message() {
		// Get private Key
		let privateKey = localStorage.getItem( "easyEncodingKey-"+this.props.message.userEmail );
		var message = this.props.message.message;

		// Check if message exists since its opotional
		if (!message) {
			return "";
		}
		
		if (privateKey) {
			var key = new RSA();

			key.importKey( privateKey, 'pkcs8' );

			var decryptedMessage = key.decrypt( message, 'base64' );

			return window.atob( decryptedMessage );
		} else {
			return message;
		}

	},
  render() {
  	return (
  		<div>
  			<br />
  			<div>
  				<b>Sender :</b> { this.props.message.senderEmail }
  			</div>
  			<div>
  				<b>Subject :</b> { this.subject() }
  			</div>
  			<div>
  				<br />
  				<b>Message</b> <br /> { this.message() }
  			</div>
  		</div>
  	);
  }
});
