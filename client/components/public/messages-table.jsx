MessagesTable = React.createClass({
	senderEmail() {
		// Refactor getting the private key and decrpting. DRY..
		let privateKey = localStorage.getItem( "easyEncodingKey-"+this.props.message.userEmail );
		let senderEmail = this.props.message.senderEmail;

		// Sender Email is required
		if (!senderEmail) {
			return "";
		}

		if ( privateKey ) {
			var key = new RSA();

			key.importKey( privateKey, 'pkcs8' );

			var decryptedSenderEmail = key.decrypt( senderEmail, 'base64' );

			return window.atob( decryptedSenderEmail );
		} else {
			return senderEmail;
		}
	},
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
	timeSent() {
		var time = this.props.message.created_at;
		var date = time.getMonth() + "/" + time.getDay() + "/" + time.getFullYear();

		return date;
	},
  render() {
  	return (
  		<div className="container">
  			{ this.timeSent() }
  			<br />
  			<div>
  				<b>Sender :</b> { this.senderEmail() }
  			</div>
  			<div>
  				<b>Subject :</b> { this.subject() }
  			</div>
  			<div>
  				<br />
  				<b>Message</b> <br /> <span style={{width: '100px'}}>{ this.message() }</span>
  			</div>
  		</div>
  	);
  }
});
