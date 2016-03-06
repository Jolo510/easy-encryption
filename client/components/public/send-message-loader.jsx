SendMessageLoader = React.createClass({
	messageformItem() {
		let emailAddress = this.props.email;
		// Wanted to handle if key existed or not here but did it in the route instead
		return <SendMessageForm email={emailAddress} />;
	},
	render() {
		return(
			<div>
				{this.messageformItem()}
			</div>
		);
	}
});