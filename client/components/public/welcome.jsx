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
	    			<div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 text-center">
		    		  <h2>Simplest way to send encrypted messages</h2>
							<CreateAccountForm />
	    				<UseCase />
		    		</div>
		    	</div>
	    	</div>
	    	<HowToGetStarted />
	    </div>
    );
  }
});

UseCase = React.createClass({
	render() {
		return (
			<div className="text-center">
				<h4>Easily send passwords, account information, private messages</h4>
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
							Then we'll email you a link to download your private key.
						</h4>
					</div>

					<div className="col-sm-4 col-md-4">
						<h4>
							2. Open up that link in the web browser you want to use. Then click the download button.
						</h4>
					</div>

					<div className="col-sm-4 col-md-4">
						<h4>
							3. Share your send messages link with others! <br /><br />
							Ex. www.easy-encryption.com/send/your-email-address
						</h4>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-offset-2 col-md-offset-2 col-sm-4 col-md-4">
						<h4>
							4. After your recieved messages, visit view link to view them <br /><br />
							Ex. www.easy-encryption.com/view/your-email-address
						</h4>
					</div>

					<div className="col-sm-4 col-md-4">
						<h4>
							Thats it! <br />
							No need to exchange keys. <br />
							No need to install broswer extensions <br />
							Quick and easy set up
						</h4>
					</div>
				</div>
			</div>
		)
	}
});