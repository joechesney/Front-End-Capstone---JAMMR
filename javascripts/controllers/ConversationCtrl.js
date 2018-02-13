"use strict";

const firebase = require('firebase');

// CONVERSATION CTRL
module.exports = function
($scope, AuthFactory, $location, MessageFactory, 
  ConversationFactory, $routeParams, ProfileFactory){

  $scope.listenToConvo = (convoId)=>{
    let JAMMRDatabase = firebase.database().ref("convos/"+convoId);
    JAMMRDatabase.on('value', (snapshot) => {
      console.log('snapshot when convo changes::',snapshot.val());
      ConversationFactory.getAllConvoMessages($routeParams.convoid)
      .then((messages)=>{
        $scope.thisConvosMessages = messages;
      });
    });
  };
  

  AuthFactory.getUser()
  .then(user => {
    $scope.uid = user.uid;
    // console.log('user',user);
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });



  // TODO: this function should run on snapshot change
  ConversationFactory.getAllConvoMessages($routeParams.convoid)
  .then((messages)=>{
    console.log('messages in controller',messages);
    $scope.thisConvosMessages = messages;
    $scope.listenToConvo($routeParams.convoid);
  });

  $scope.sendNewMessage = ()=>{
    ProfileFactory.getUserProfileData($scope.uid)
    .then((theUser)=>{
      $scope.newMessage.userName = theUser.name;
      $scope.newMessage.uid = $scope.uid;
      ConversationFactory.saveNewMessage($scope.newMessage, $routeParams.convoid)
      .then((messageData)=>{
        ConversationFactory.getAllConvoMessages($routeParams.convoid)
        .then((messages)=>{
          $scope.thisConvosMessages = messages;
        });
      });
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


};