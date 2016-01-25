Welcome = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		console.log("Form Submitted");
	},
  render() {
    return (
    	<div className="container">
    		<h2>Welcome to easy encryption</h2>
    		<form onSubmit={this.handleSubmit}>
    			 <input
          	type="text"
         		placeholder="Say something..."
        	 />

    			<input type="submit" value="Post" />
    		</form>
    	</div>
    );
  }
});