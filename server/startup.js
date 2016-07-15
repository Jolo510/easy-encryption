Meteor.startup( () => {
  	Modules.server.startup();
  	BrowserPolicy.content.allowScriptOrigin( 'cdn.heapanalytics.com' );
  	BrowserPolicy.content.allowImageOrigin( 'heapanalytics.com' );
});