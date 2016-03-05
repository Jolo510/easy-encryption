ViewMessagesLoader = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let emailAddress = this.props.email;
    var handle = Meteor.subscribe( 'messages', emailAddress );

    // An array of objects
    var messages = Messages.find({ userEmail: emailAddress}).fetch();
    return {
      messagesLoading: ! handle.ready(),
      messages: Messages.find({ userEmail: emailAddress}).fetch()
    };
  },
  render() {
    // Shows loading
    if (this.data.messagesLoading) {
      return (
        <div>Loading...</div>
      );
    }
    //
    return (
      <div>
        <h2>View Messages</h2>
        {this.data.messages.map( ( message, index ) => {
          return <MessagesTable key={index} message={message} />;
        })}
      </div>
    );
  }
}); 