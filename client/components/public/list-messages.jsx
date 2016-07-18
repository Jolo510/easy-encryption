ListMessages = React.createClass({
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
	timeSent() {
		var time = this.props.message.created_at;
		var date = time.getMonth() + "/" + time.getDate() + "/" + time.getFullYear();

		return date;
	},
	handleClick() {
		const userEmail = this.props.message.userEmail,
					messageId = this.props.message._id;

		FlowRouter.go('/view/' + userEmail + '/' + messageId);
	},
  render() {
  	let sender = {
  		'maxWidth': '216px'
  	}

  	let subject = {
  		'maxWidth': '516px'
  	}

  	let date = {
  		'maxWidth' :'155px'
  	}

  	return (
			<tr className="table-row-style" onClick={ this.handleClick } >
				<td className="ellipsis-overflow" style={sender}>{ this.senderEmail() }</td>
				<td className="ellipsis-overflow" style={subject}>{ this.subject() }</td>
				<td className="ellipsis-overflow" style={date}>{ this.timeSent() }</td>
			</tr>
  	);
  }
});
