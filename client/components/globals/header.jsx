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
      'marginBottom': '0px'
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
          <div className="navbar-header">
            <a className="navbar-brand" href={this.brandLink()}>Paper Notes</a>
            <span>

            </span>
          </div>
          <div className="nav navbar-nav pull-right">
            {viewMessagesButton}
          </div>
          {this.navigationItems()}
        </div>
      </nav>
    );
  }
});

ViewMessagesLink = React.createClass({
  render() {
    let viewMessagesStyle = {
      'marginTop': '8px'
    }

    let emailLink;
    const emailsArray = EncryptionKeyHelpers.getEmailAccountsFromLocalStorage();

    if ( Array.isArray(emailsArray) && emailsArray.length >= 0 ) {
      const email = emailsArray[0];
      emailLink = "https://www.papernotes.co/view/" + email;
    }

    return (
      <a href={emailLink} className="btn btn-default" style={viewMessagesStyle}>View Messages</a>
    )
  }
});
