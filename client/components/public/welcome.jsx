Welcome = React.createClass({
  render() {
  	let removeSidePadding = {
  		'paddingLeft': '0px',
  		'paddingRight': '0px',
  	};

  	let jumbotronStyle = {
  		'paddingBottom': '24px',
  		'color': '#FFFFFF',
  		'borderRadius': '0px'
  	};

  	let paddingBottom = {
  		'paddingBottom': '25px'
  	};

    return (
    	<div className="container-fluid" style={removeSidePadding}>
		  	<div className="jumbotron default-primary-color" style={jumbotronStyle}>
    			<div className="row">
	    			<div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 text-center">
		    		  <h2 style={paddingBottom}>Simplest way to send encrypted messages</h2>
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
				<h3>Easily send passwords, account information, private messages</h3>
			</div>
		)
	}
});

/* For responsive images
 * <img src="/test1.png" className="img-responsive img-rounded img-border" alt="Responsive image" />
 */

HowToGetStarted = React.createClass({
	render() {
		let keyColor = {
			// 'color': '#FFC107'
			'color': '#FFEB3B'
		};

		let arrowStyle = {
			'paddingLeft': '30px',
			'paddingRight': '30px',
			'color': '#333333'
		};

		let laptopColor = {
			'color': '#03A9F4'
		};

		let groupStyle = {
			'color': '#BBDEFB'
		};

		let lockStyle = {
			'fontSize': '50px'
		};

		let lockColor = {
			'color': '#005C99'
		};

		let paddingTop15 = {
			'paddingTop': '15px'
		};

		let secretStyle = {
			'color': '#005C99'
		};

		return (
			<div>
				<div className="container">
					<h2 className="text-center">
						How To Get Started
						<hr className="hr-alt"/>
					</h2>
					<div className="row row-padding">
						<div className="col-sm-6 font-align-left">
							<h3>Install Your Key</h3>
							<p className="font-style">
								Enter your email to create an account. We’ll send you a link that sets up your browser to be able to decrypt messages that are sent to your Paper Notes inbox.
							</p>
						</div>
						<div className="col-sm-6 font-align-right large-icon-size icon-padding">
							<i className="fa fa-key dark-border" style={keyColor} aria-hidden="true"></i>
							<i className="fa fa-long-arrow-right" style={arrowStyle} aria-hidden="true"></i>
							<i className="fa fa-laptop" style={laptopColor} aria-hidden="true"></i>
						</div>
					</div>
				</div>

				<div className="container-fluid super-light-grey-background">
					<div className="container">
						<div className="row row-padding">
							<div className="col-sm-6 col-sm-push-6 font-align-right">
								<h3>
									People Send You Encrypted Messages
								</h3>
								<p className="font-style">
									You get a link you can share with others.
									Your friends can send you messages using this link that can only be decrypted from your browser.
									<br /> <br />
									<b><em>Not even we can decrypt your messages!</em></b>
								</p>
							</div>
							<div className="col-sm-6 col-sm-pull-6 text-center med-icon-size">
								<i className="fa fa-users" style={groupStyle} aria-hidden="true"></i>
								<i className="fa fa-long-arrow-right" style={arrowStyle} aria-hidden="true"></i>
								<i className="fa fa-envelope"></i>
								<br />
								<i className="fa fa-long-arrow-right" style={arrowStyle} aria-hidden="true"></i>
								<i className="fa fa-user-secret" style={secretStyle} aria-hidden="true"></i>
							</div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row row-padding">
						<div className="col-sm-6 font-align-left">
							<h3>
								Decrypt Your Messages
							</h3>
							<p className="font-style">
								You can decrypt and view your messages without having to enter a password.
								You just have to use the browser you set up.
							</p>
						</div>
						<div className="col-sm-6 font-align-right" style={paddingTop15}>
							<span className="fa-stack fa-4x">
							  <i className="fa fa-envelope fa-stack-2x"></i>
							  <i className="fa fa-lock fa-stack-1x dark-border" style={lockColor}></i>
							</span>

							<i className="fa fa-ellipsis-h fa-2x icon-padding" aria-hidden="true"></i>

							<span className="fa-stack fa-4x">
								<i className="fa fa-envelope fa-stack-2x"></i>
							  <i className="fa fa-key fa-stack-1x dark-border" style={keyColor} aria-hidden="true"></i>
							</span>

							<i className="fa fa-ellipsis-h fa-2x icon-padding hide-in-small-view" aria-hidden="true"></i>

							<span className="fa-stack fa-4x">
							  <i className="fa fa-envelope-o fa-stack-2x"></i>
							  <i className="fa fa-unlock-alt fa-stack-1x dark-border" style={laptopColor}></i>
							</span>
						</div>
					</div>
				</div>

				<div className="container-fluid super-light-grey-background">
					<div className="container">
						<div className="text-center">
							<h3>
								That’s it!
							</h3>
							<p className="font-style">
								No need to exchange keys.<br />
								No need to install browser extensions.<br />
								Setup is quick and easy.
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
});