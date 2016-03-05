MessagesTable = React.createClass({
	decryptedMessage() {
		let current = this.props.message.message;

		// Get private Key

		let privateKey = localStorage.getItem("easyEncodingKey-"+this.props.message.userEmail);
		var message = this.props.message.message; 
		
		if (privateKey) {
			var key = new RSA();

			key.importKey(privateKey, 'pkcs8');

			var decryptedMessage = key.decrypt( message, 'base64' );

			return window.atob(decryptedMessage);
		} else {
			return message;
		}

	},
  render() {
  	return (
  		<div>
  			<br />
  			<div>
  				Sender : {this.props.message.senderEmail}
  			</div>
  			<div>
  				Message <br /> { this.decryptedMessage() }
  			</div>
  		</div>
  	);
  }
});
