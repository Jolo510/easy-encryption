Welcome = React.createClass({
  render() {
  	let jumbotronStyle = {
  		'paddingLeft': '0px',
  		'paddingRight': '0px'
  	};

    return (
    	<div className="container-fluid" style={jumbotronStyle}>
		  	<div className="jumbotron">
    			<div className="row">
	    			<div className="col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-3 col-md-6 text-center">
		    		  <h2>A simple way to send encrypted messages</h2>
							<CreateAccountForm />
		    		</div>
		    	</div>
	    	</div>
	    	<UseCase />
	    	<HowToGetStarted />
	    	<HowItWorks />
	    </div> 
    );
  }
});

UseCase = React.createClass({	
	render() {
		return (
			<div className="text-center">
				<h3>Easily send passwords, account information, private messages</h3>
			</div>
		)
	}
});

HowToGetStarted = React.createClass({
	render() {
		return (
			<div className="text-center">
				<h3>How to get started</h3>
				<div className="row">
					<div className="col-sm-4 col-md-4">
						<h4>
							1. Enter your email address to create an account. 
							Then check your email to download your unique key.
						</h4>
					</div>

					<div className="col-sm-4 col-md-4">
						<h4>
							2. Open up the web browser and computer that you will use to view your encrypted messages. 
						</h4>
					</div>

					<div className="col-sm-4 col-md-4">
						<h4>
							3. Visit the link send in your email to generate your encryption keys!
							It will be the only web browser and computer you can decrypt your messages. (Find out why here)
						</h4>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-offset-2 col-md-offset-2 col-sm-4 col-md-4">
						<h4>
							4. Now that your keys are generated, share your send form link! <br /><br />
							Ex. www.easy-encryption.com/send/your-email-address
						</h4>
					</div>

					<div className="col-sm-4 col-md-4">
						<h4>
							5. After your recieved messages, visit view link to view them <br /><br />
							Ex. www.easy-encryption.com/view/your-email-address
						</h4>
					</div>
				</div>

				<div> 
					<h4>
						Thats it! <br />
						No need to exchange keys. <br />
						No need to install broswer extensions <br />
						Quick and easy set up
					</h4>
				</div>
			</div>
		)
	}
});


HowItWorks = React.createClass({
	render() {
		return (
			<div className="text-center">
				<h3>How it works</h3>
			</div>
		)
	}
});