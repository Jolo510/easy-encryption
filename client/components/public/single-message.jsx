SingleMessage = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const messageId = this.props.messageId;
    const userEmail = this.props.email;

    var handle = Meteor.subscribe( 'messages', userEmail );
    var test = Messages.find({ _id: messageId }).fetch();

    return {
      messagesLoading: ! handle.ready(),
      message: test
    };
  },
  userEmail() {
    let data = this.data.message;
    return getItemFromData(data, "userEmail");
  },
  senderEmail() {
    let data = this.data.message;
    let privateKey = localStorage.getItem( "easyEncodingKey-"+this.props.email );
    var senderEmail = getItemFromData(data, "senderEmail");
    if ( senderEmail ) {
      var decrptedText = RSAHelpers.decrypt(privateKey, senderEmail);
      return decrptedText;
    }

  },
  subject() {
    let data = this.data.message;
    let privateKey = localStorage.getItem( "easyEncodingKey-"+this.props.email );
    var subject = getItemFromData(data, "subject");
    if ( subject ) {
      var decrptedText = RSAHelpers.decrypt(privateKey, subject);
      return decrptedText;
    }

  },
  message() {
    let data = this.data.message;
    let privateKey = localStorage.getItem( "easyEncodingKey-"+this.props.email );
    var message = getItemFromData(data, "message");

    if ( message ) {
      var decrptedText = RSAHelpers.decrypt(privateKey, message);
      return decrptedText;
    }
  },
  timeSent() {
    let data = this.data.message;
    let time = getItemFromData(data, "created_at");
    if ( time ) {
      var date = time.getMonth() + "/" + time.getDay() + "/" + time.getFullYear();
      return date;
    }

  },
  render() {
    return (
      <div className="container">
        <div className="subject">
          { this.subject() }
        </div>
        <hr />
        <div className="row">
          <div className="col-xs-8 col-sm-8 col-md-8">
            From: { this.senderEmail() }
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 pull-right">
            <span className="pull-right">
              Date Sent: { this.timeSent() }
            </span>
          </div>
        </div>
        <hr />
        <div>
          { this.message() }
        </div>
      </div>
    )
  }
});

function getItemFromData(dataArray, key) {
  if ( Array.isArray(dataArray) && dataArray.length > 0 && dataArray[0][key] ) {
    return dataArray[0][key];
  } else {
    return "";
  }
}