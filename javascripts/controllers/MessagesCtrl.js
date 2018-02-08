"use strict";


// MESSAGES CTRL
module.exports = function
($scope, $location, AuthFactory, MessageFactory){

  $scope.test = "Messages List here";
  AuthFactory.getUser()
  .then(user => {
    console.log('messages bruh', user);
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });

  
  // Get messages from server
  // display any conversation that this user is involved in 

  
  // TODO: Reorder conversations based on the most recent message. 
  // So, WHEN a new message has been sent in a conversation, 
  // then take that conversation id, and for both users, move it
  // to the front of their conversations array. that way, it will be
  // at the top of their conversation list when it displays.

  // Also, somehow display the most recent message on the convo block

  // display profile picture on the convo block??

};