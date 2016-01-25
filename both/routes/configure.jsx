FlowRouter.notFound = {
  action() {
    ReactLayout.render( Default, { yield: <NotFound /> } );
  }
};

// Accounts.onLogin( () => {
//   let currentRoute = FlowRouter.current();
//   if ( currentRoute && currentRoute.route.group.name === 'public' ) {
//     FlowRouter.go( 'index' );
//   }
// });

if ( Meteor.isClient ) {
  Tracker.autorun( () => {
    console.log("Tracker autorun", FlowRouter.current().route);
    if ( !Meteor.userId() && FlowRouter.current().route ) {
      FlowRouter.go( 'login' );
    }
  });
}
