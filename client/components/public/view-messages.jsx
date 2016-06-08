ViewMessagesLoader = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let emailAddress = this.props.email;
    var handle = Meteor.subscribe( 'messages', emailAddress );

    return {
      messagesLoading: ! handle.ready(),
      messages: Messages.find({ userEmail: emailAddress}, {sort: { "created_at": -1 } }).fetch()
    };
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
    //
    return (
      <div className="container">
        <table className="table table-hover border">
          <caption>Messages for { this.props.email } </caption>
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