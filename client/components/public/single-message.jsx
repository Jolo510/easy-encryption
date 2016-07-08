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
      var decryptedText = RSAHelpers.decrypt(privateKey, senderEmail);
      return decryptedText;
    }

  },
  subject() {
    let data = this.data.message;
    let privateKey = localStorage.getItem( "easyEncodingKey-"+this.props.email );
    var subject = getItemFromData(data, "subject");
    if ( subject ) {
      var decryptedText = RSAHelpers.decrypt(privateKey, subject);
      return decryptedText;
    }

  },
  encryptedMessage() {
    let data = this.data.message;
    let privateKey = localStorage.getItem( "easyEncodingKey-"+this.props.email );
    var message = getItemFromData(data, "message");

    if ( message ) {
      return message
    }

    // var decryptedText = RSAHelpers.decrypt(privateKey, message);
    // return decryptedText;
  },
  decryptMessage() {
    console.log("Hello World!");
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
        <EncryptedMessageBox email={ this.props.email } messageId={ this.props.messageId } />
      </div>
    )
  }
});

EncryptedMessageBox = React.createClass({
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
  getInitialState : function() {
     return { showMe : false };
  },
  onClick : function() {
     this.setState({ showMe : true} );
  },
  encryptedMessage() {
    let data = this.data.message;
    var message = getItemFromData(data, "message");

    if ( message ) {
      return message
    }
  },
  decryptedMessage() {
    let data = this.data.message;
    let privateKey = localStorage.getItem( "easyEncodingKey-"+this.props.email );
    let message = getItemFromData(data, "message");

    if ( message ) {
      // var startTime = new Date();
      let decryptedText = RSAHelpers.decrypt(privateKey, message);
      // let endTime = new Date();

      // console.log( (endTime.getTime() - startTime.getTime()) / 1000 + " seconds");
      return decryptedText;
    }
  },
  render() {
    let encryptedTextStyle = {
      'wordWrap': 'break-word',
      'border': '.25px solid black',
      'borderRadius': '5px',
      'minHeight': '345px',
      'padding': '5px',
      'color': 'transparent',
      'textShadow': 'rgba(0, 0, 0, 0.7) 0px 0px 2px'
    };

    let decryptedTextStyle = {
      'border': '.25px solid black',
      'borderRadius': '5px',
      'minHeight': '345px',
      'padding': '5px'
    };

    let textCenter= {
      'textAlign': 'center'
    };

    let test = {
      'fontSize': '50px'
    };

    if( this.state.showMe ) {
      return (
        <div style={decryptedTextStyle} >
          { this.decryptedMessage() }
        </div>
      );
    } else {
      return (
        <div style={encryptedTextStyle}>
          <div>
            { this.encryptedMessage() }
          </div>
          <div style={textCenter}>
            <button className="btn btn-default" style={test} onClick={ this.onClick }>
              <span className="glyphicon glyphicon-lock" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      );
    }
  }
});

function getItemFromData(dataArray, key) {
  if ( Array.isArray(dataArray) && dataArray.length > 0 && dataArray[0][key] ) {
    return dataArray[0][key];
  } else {
    return "";
  }
}