AppFooter = React.createClass({
  render() {
  	let footerStyle = {
  		'paddingTop': '15px'
  	};

    return (
			<nav className="navbar navbar-default navbar-fixed-bottom">
		    <div className="container">
	        <div className="row">
            <div className="col-xs-12 text-center" style={footerStyle}>
              Copyright <i className="glyphicon glyphicon-copyright-mark"></i> &nbsp;
              <a href="/">Papernotes</a>
            </div>
		        </div>
		    </div>
			</nav>
    );
  }
});
