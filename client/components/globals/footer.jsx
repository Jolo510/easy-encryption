AppFooter = React.createClass({
  render() {
  	let footerStyle = {
  		'paddingTop': '15px',
  	};

    let navFooterStyle = {
      'color': '#FFFFFF',
      'backgroundColor': '#03A9F4'
    };

    let darkGrey = {
      'color': '#333333'
    };

    return (
			<nav className="navbar navbar-default navbar-fixed-bottom" style={navFooterStyle}>
		    <div className="container">
	        <div className="row">
            <div className="col-xs-12 text-center" style={footerStyle}>
              Copyright <i className="glyphicon glyphicon-copyright-mark"></i> &nbsp;
              <a href="/" style={darkGrey}>Papernotes</a>
            </div>
		        </div>
		    </div>
			</nav>
    );
  }
});
