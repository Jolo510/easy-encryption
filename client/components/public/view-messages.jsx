ViewMessagesLoader = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let emailAddress = this.props.email;
    var handle = Meteor.subscribe( 'messages', emailAddress );

    return {
      messagesLoading: !handle.ready(),
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
    if (this.data.messagesLoading) {
      return (
        <Loading />
      );
    }

    let email = "https://www.papernotes.co/send/" + this.props.email;

    let inputStyle = {
      'minWidth': '300px',
      'borderColor': '#595959',
      'borderWidth': '2px',
      'height': '38px'
    }

    return (
      <div className="container">
        <br />
        <form className="form-inline">
          <div className="form-group">
            <label htmlFor="sendToEmailAddressForm" className="content-font-style">Send Message To :&nbsp;</label>
            <input
              type="email"
              name="sendToEmailAddress"
              className="form-control btn-style"
              placeholder="example@gmail.com"
              style={inputStyle}
              tabIndex="1"
            />
          </div>
          <button type="submit" className="btn btn-default btn-style" onClick={this.sendMessageForm} tabIndex="2">Submit</button>
        </form>
        <div className="table-responsive">
          <table className="table table-hover border content-font-style table-style table-striped" >
            <caption className="row-padding">
              <span>
                Share Your Send Messages Link : <a href={email}>
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
      </div>
    );
  }
});