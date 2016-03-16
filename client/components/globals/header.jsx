AppHeader = React.createClass({
  brandLink() {
    // if ( !Meteor.loggingIn() && !Meteor.userId() ) {
    //   return FlowRouter.path( 'login' );
    // }

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
      'margin-bottom': '0px'
    };

    return (
      <nav className="navbar navbar-default" style={navbarStyle} role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href={this.brandLink()}>Easy Encryption</a>
          </div>
          {this.navigationItems()}
        </div>
      </nav>
    );
  }
});
