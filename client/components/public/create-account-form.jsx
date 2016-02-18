CreateAccountForm = React.createClass({
  componentDidMount() {
  	// Logic is in the file email-signup.js
    Modules.client.emailSignup({
      form: "#emailSignup"
    });
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
	render() {
		return (
			<div>
				<form id="emailSignup" className="signUp" onSubmit={this.handleSubmit}>
					<div className="form-group">
			    	<label htmlFor="eamilAddress">Email address &nbsp;</label>
			    	<input 
			    		type="email"
							name="emailAddress"
			    		className="form-control"
			    		placeholder="Email Address" />
				  </div>
					<button type="submit" className="btn btn-success">Submit</button>
				</form>
			</div>
		);
	}
});