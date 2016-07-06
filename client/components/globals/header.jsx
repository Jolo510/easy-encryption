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
    let navbarStyle = {
      'marginBottom': '0px',
      'height': '50px'
    };

    let navItemPadding = {
      'padding': '8px 0px 8px 15px'
    };

    let viewMessagesButton;
    const emailsArray = EncryptionKeyHelpers.getEmailAccountsFromLocalStorage();

    if ( Array.isArray(emailsArray) && emailsArray.length > 0 ) {
      viewMessagesButton = <ViewMessagesLink />;
    } else {
      viewMessagesButton = "";
    }


    return (
      <nav className="navbar navbar-default" style={navbarStyle} role="navigation">
        <div className="container">
          <a className="navbar-brand" href={this.brandLink()}>Paper Notes</a>
          <div className="pull-right" style={navItemPadding}>
            {viewMessagesButton}
          </div>
        </div>
      </nav>
    );
  }
});

ViewMessagesLink = React.createClass({
  render() {
    let viewMessagesStyle = {
      'marginTop': '8px',
      'fontSize': '18px'
    };

    let noMargin = {
      'margin': '0px'
    };

    let emailStyle = {
      'display': 'inline-block',
      'maxWidth': '145px',
      'marginBottom': '-7px',
      'paddingRight': '5px',
      'overflow': 'hidden',
      'textOverflow': 'ellipsis',
      'whiteSpace': 'nowrap',
    };

    let emailLink, email = "";
    const emailsArray = EncryptionKeyHelpers.getEmailAccountsFromLocalStorage();

    if ( Array.isArray(emailsArray) && emailsArray.length >= 0 ) {
      email = emailsArray[0];
      emailLink = "https://www.papernotes.co/view/" + email;
    }

    return (
      <div>
        <div style={emailStyle}>
          {email}
        </div>
        <span>
          <a href={emailLink} className="btn btn-default" style={noMargin}>
            <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>
          </a>
        </span>
      </div>
    )
  }
});
