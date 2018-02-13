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
      .then((messagesObj)=>{
        if(messagesObj !== undefined && messagesObj !== null){
          let newMessagesObj = $scope.assignUserMessagerClasses(messagesObj);
          console.log('newMessagesObj in controller',newMessagesObj);
          $scope.thisConvosMessages = newMessagesObj;
        }
      });
    });
  };
  
  AuthFactory.getUser()
  .then(user => {
    $scope.uid = user.uid;
    console.log('scope uid',$scope.uid);
    $scope.listenToConvo($routeParams.convoid);
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });


  // TODO: scroll the page to the bottom when a new message is sent

  
  $scope.sendNewMessage = (event)=>{
    // console.log('evetn',event);
    if(event.keyCode === 13){
      ProfileFactory.getUserProfileData($scope.uid)
      .then((theUser)=>{
        $scope.newMessage.userName = theUser.name;
        $scope.newMessage.uid = $scope.uid;
        ConversationFactory.saveNewMessage($scope.newMessage, $routeParams.convoid)
        .then((messageData)=>{
          ConversationFactory.getAllConvoMessages($routeParams.convoid)
          .then((messagesObj)=>{
            // let newMessagesObj = $scope.assignUserMessagerClasses(messagesObj);
            // console.log('newmessagesObj',newMessagesObj);
            // $scope.thisConvosMessages = newMessagesObj;
          });
        });
      });
    }
  };

  $scope.assignUserMessagerClasses=(messagesObj)=>{
    let keys = Object.keys(messagesObj);
    keys.forEach(key => messagesObj[key].msgID = key);
    let messagesArray = Object.values(messagesObj);
    messagesArray.forEach(msg =>{
      console.log('message',messagesObj[msg.msgID]);
      if(messagesObj[msg.msgID].uid === $scope.uid){
        messagesObj[msg.msgID].currentUser = true;
      } else {
        messagesObj[msg.msgID].currentUser = false;
      }
    });
    return messagesObj;
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