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
		let divStyle = {
			'marginRight': '5px'
		}

		let inputStyle ={
			'minWidth': '300px'
		}
		return (
			<div>
				<form id="emailSignup" className="form-inline signUp" onSubmit={this.handleSubmit}>
					<div className="form-group" style={divStyle}>
			    	<label className="sr-only" htmlFor="emailAddress">Email address &nbsp;</label>
			    	<div className="input-group">
				    	<input
				    		type="email"
								name="emailAddress"
				    		className="form-control"
				    		style={inputStyle}
				    		placeholder="Email Address"
				    		tabIndex="1"
				    	/>
						  <span className="input-group-btn">
								<button type="submit" className="btn btn-success" tabIndex="2">Submit</button>
						  </span>
				    </div>
				  </div>
				</form>
			</div>
		);
	}
});
