ViewMessagesLoader = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let emailAddress = this.props.email;
    var handle = Meteor.subscribe( 'messages', emailAddress );

    return {
      messagesLoading: ! handle.ready(),
      messages: Messages.find({ userEmail: emailAddress}, {sort: { "created_at": -1 } }).fetch(),
    };
  },
  // **Should make this into its own component
  sendMessageForm( event ) {
    event.preventDefault();

    // Check if user exists
    const sendToEmailAddress = $( '[name="sendToEmailAddress"]' ).val();

    // If not display error message
    Meteor.call("checkIfAccountExists", sendToEmailAddress, function(err, doesUserExists) {
      if (err) {
        Bert.alert("An Error has occured", "danger");
      }

      if ( doesUserExists ) {
        FlowRouter.go("/send/"+sendToEmailAddress);
      } else {
        Bert.alert("User does not exists", "danger");
      }
    });
  },

  render() {
    // Shows loading
    if (this.data.messagesLoading) {
      return (
        <div className="container">
          Loading...
        </div>
      );
    }

    let email = "https://www.papernotes.co/send/" + this.props.email;

    return (
      <div className="container">
        <br />
        <form className="form-inline">
          <div className="form-group">
            <label htmlFor="sendToEmailAddressForm">Access Users Message Form:&nbsp;</label>
            <input
              type="email"
              name="sendToEmailAddress"
              className="form-control"
              placeholder="JohnDoe@gmail.com"
              tabIndex="1"
            />
          </div>
          <button type="submit" className="btn btn-default" onClick={this.sendMessageForm} tabIndex="2">Submit</button>
        </form>
        <table className="table table-hover border">
          <caption>
            Messages for { this.props.email }
            <span className="pull-right">
              <a href={email}>
                {email}
              </a>
            </span>
          </caption>
          <thead>
            <tr>
              <th>Sent From</th>
              <th>Subject</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {
              this.data.messages.map( ( message, index ) =>
                {
                  return <ListMessages key={index} message={message} />;
                }
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
});