AppFooter = React.createClass({
  render() {
  	let footerStyle = {
  		'paddingTop': '5px',
      'paddingBottom': '5px'
  	};

    let navFooterStyle = {
      'color': '#FFFFFF',
      'backgroundColor': '#03A9F4'
    };

    let darkGrey = {
      'color': '#333333'
    };

    let heapStyle = {
      'width': '108px',
      'height': '41px'
    };

    let copyRightStyle = {
      'display': 'inline-block',
      'paddingTop': '10px'
    };

    return (
			<nav className="navbar navbar-default navbar-fixed-bottom" style={navFooterStyle}>
		    <div className="container">
	        <div className="row">
            <div className="col-xs-12 text-center" style={footerStyle}>
              <div style={copyRightStyle}>
                Copyright <i className="glyphicon glyphicon-copyright-mark"></i> &nbsp;
                <a href="/" style={darkGrey}>Papernotes</a>
              </div>
              <a className="pull-right" href="https://heapanalytics.com/?utm_source=badge">
                <img style={heapStyle} src="//heapanalytics.com/img/badgeLight.png" alt="Heap | Mobile and Web Analytics" />
              </a>
            </div>
		      </div>
		    </div>
			</nav>
    );
  }
});
