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

		let inputStyle = {
			'minWidth': '300px',
			// 1976D2
			'borderColor': '#595959',
			'borderWidth': '2px',
			'height': '36px'
		};

		let buttonStyle = {
			'marginBottom': '26px',
			'borderWidth': '2px'
		};

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
				    		placeholder="Enter your email to create an account!"
				    		autoComplete="off"
				    		tabIndex="1"
				    	/>
						  <span className="input-group-btn">
								<button type="submit" className="btn btn-default btn-style" style={buttonStyle} tabIndex="2">Submit</button>
						  </span>
				    </div>
				  </div>
				</form>
			</div>
		);
	}
});
