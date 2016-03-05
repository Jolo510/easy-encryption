SendMessageLoader = React.createClass({
	messageformItem() {
		let emailAddress = this.props.email;
		emailAddress=false;

		return <SendMessageForm />;
	},
	render() {
		return(
      <div>
      	<h2>Send Message</h2>
      	{this.messageformItem()}
      </div>
		);
	}
});