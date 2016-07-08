Loading = React.createClass({
  render() {
  	let paddingTop = {
			'paddingTop': '25px'
		};

    return (
			<div className="text-center" style={paddingTop}>
				<i className="fa fa-spinner fast-spin fa-3x fa-fw"></i>
				<span className="sr-only">Loading...</span>
      </div>
    );
  }
});
