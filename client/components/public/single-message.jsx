SingleMessage = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const messageId = this.props.messageId;
    const userEmail = this.props.email;

    var handle = Meteor.subscribe( 'messages', userEmail );
    var messages = Messages.find({ _id: messageId }).fetch();

    return {
      messagesLoading: ! handle.ready(),
      message: messages
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
        <div className="subject ellipsis-overflow">
          { this.subject() }
        </div>
        <hr className="hr-long-alt" />
        <div className="row">
          <div className="col-xs-8 col-sm-8 col-md-8 ellipsis-overflow">
            <span>
              <b>From:</b> { this.senderEmail() }
            </span>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 ellipsis-overflow">
            <span className="pull-right">
              <b>Date Sent:</b> { this.timeSent() }
            </span>
          </div>
        </div>
        <hr className="hr-long-alt" />
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
  decryptText : function() {
    this.setState({ showMe : true} );
  },
  encryptText : function() {
    this.setState({ showMe : false} );
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
      let decryptedText = RSAHelpers.decrypt(privateKey, message);

      if ( message ==  decryptedText ) {
        Bert.alert( "Decryption did not work. Are you sure this is your email address?", 'warning', 'growl-top-left' );
      }
      return decryptedText;
    }
  },
  render() {
    let encryptedTextStyle = {
      'wordWrap': 'break-word',
      'border': '3px solid #595959',
      'borderRadius': '5px',
      'minHeight': '340px',
      'padding': '5px',
      'color': 'transparent',
      'textShadow': 'rgba(0, 0, 0, 0.7) 0px 0px 2px'
    };

    let decryptedTextStyle = {
      'wordWrap': 'break-word',
      'border': '3px solid #595959',
      'borderRadius': '5px',
      'minHeight': '340px',
      'padding': '5px'
    };

    let textCenter= {
      'textAlign': 'center',
      'paddingBottom': '5px'
    };

    let border = {
      'width': '100%'
    };

    if( this.state.showMe ) {
      return (
        <div>
          <div style={textCenter}>
            <button className="btn btn-default btn-style" style={border} onClick={ this.encryptText }>
              <i className="fa fa-unlock-alt fa-3x"></i>
            </button>
          </div>
          <div className="table-style" style={decryptedTextStyle} >
            <div>
              { this.decryptedMessage() }
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div style={textCenter}>
            <button className="btn btn-default btn-style" style={border} onClick={ this.decryptText }>
              <i className="fa fa-lock fa-3x"></i>
            </button>
          </div>
          <div className="table-style" style={encryptedTextStyle}>
            <div>
              { this.encryptedMessage() }
            </div>
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