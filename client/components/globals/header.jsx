AppHeader = React.createClass({
  brandLink() {
    return FlowRouter.path( 'welcome' );
  },

  navigationItems() {
    if ( !Meteor.loggingIn() && Meteor.user() ) {
      return <AuthenticatedNavigation />;
    } else {
      return <PublicNavigation />;
    }
  },

  render() {
    let viewMessagesButton;
    const emailsArray = EncryptionKeyHelpers.getEmailAccountsFromLocalStorage();

    let removeBottomBorder = {
      'border': '0px',
      'borderRadius': '0px'
    };

    let brand = {
      'fontSize': '22px'
    };

    if ( Array.isArray(emailsArray) && emailsArray.length > 0 ) {
      viewMessagesButton = <ViewMessagesLink />;
    } else {
      viewMessagesButton = "";
    }

    return (
      <nav className="navbar navbar-default margin-bottom-none default-primary-color text-primary-color" style={removeBottomBorder} role="navigation">
        <div className="container">
          <a className="navbar-brand" style={brand} href={this.brandLink()}>
            <i className="fa fa-lock fa-lg text-primary-color" aria-hidden="true"></i>&nbsp;
            <span className="text-primary-color">
              Paper Notes
            </span>
          </a>
          <div className="pull-right nav-item-padding">
            {viewMessagesButton}
          </div>
        </div>
      </nav>
    );
  }
});

ViewMessagesLink = React.createClass({
  render() {
    let emailLink, email = "";
    const emailsArray = EncryptionKeyHelpers.getEmailAccountsFromLocalStorage();

    let envelopeSize = {
      'fontSize': '16px',
      'fontWeight': 'bold'
    };

    let primaryColor = {
      // 1976D2
      'color': '#333333',
      'borderColor': '#333333',
      'borderWidth': '3px'
    };

    let darkPrimaryColor = {
      'borderColor': '#333333'
    };

    let btnText = {
      'fontSize': '16px'
    };

    if ( Array.isArray(emailsArray) && emailsArray.length >= 0 ) {
      email = emailsArray[0];
      emailLink = "https://www.papernotes.co/view/" + email;
    }

    return (
      <div>
        <div className="ellipsis-text-sm email-header-style">
          {email}&nbsp;
        </div>
        <span>
          <a href={emailLink} className="btn btn-default margin-none font-family btn-style" style={btnText}>
            <i className="fa fa-envelope-o" style={envelopeSize} aria-hidden="true"></i> - Messages
          </a>
        </span>
      </div>
    )
  }
});
