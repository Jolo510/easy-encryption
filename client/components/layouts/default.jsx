Default = React.createClass({
	render() {
    return (
      <div className="app-root">
        <AppHeader />
  			<div>
  			  {this.props.yield}
  			</div>
      </div>
		);
	}
});
