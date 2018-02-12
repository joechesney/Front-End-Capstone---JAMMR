"use strict";


// CONVERSATION CTRL
module.exports = function
($scope, AuthFactory, $location, MessageFactory, ConversationFactory, $routeParams){

  $scope.test = "Conversation here";

  AuthFactory.getUser()
  .then(user => {
    console.log('convos bruh', user);
    $scope.uid = user.uid;
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });

  // and then in the conversation 
  // controller it will run  a GET funciton to get the convo and print it to the screen
  ConversationFactory.getAllConvoMessages($routeParams.convoid)
  .then((messages)=>{
    console.log('messages in controller',messages);
    $scope.thisConvosMessages = messages;
  });

  $scope.sendNewMessage = ()=>{
    $scope.newMessage.user = $scope.uid;
    // TODO: also save userName to message
    // save message as object inside an object, instead of an array
    ConversationFactory.saveNewMessage($scope.newMessage, $routeParams.convoid)
    .then((messageData)=>{
      console.log('after sending a new message',messageData);
    });
  };


  // TODO: input box at the bottom to send a new message
  // when the message sends, it will save it to firebase,
  // and update the screen to show that new message,
  // which will be done with a new call to firebase

  // TODO: message object will contain uidm, message text,
  // and will be sent to the cid of that convo

  // TODO: add timestamp to messages

  // TODO: display name of the other user in the convo at the top of the page

  // TODO: get username of each user, using their userid attached to the message

};