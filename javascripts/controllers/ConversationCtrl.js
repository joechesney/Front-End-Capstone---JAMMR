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
      $scope.getConvo();
    });
  };
  

  
  $scope.getConvo = ()=>{
    ConversationFactory.getAllConvoMessages($routeParams.convoid)
    .then((data)=>{
      if(data === null || data === undefined){
        console.log('no messages between these users');
      }else{
        let nameArray = [];
        nameArray.push(data.user1);
        nameArray.push(data.user2);
        nameArray.forEach(uid=>{
        if(uid !== $scope.uid){
          AuthFactory.getUserName(uid)
          .then((name)=>{
            $scope.otherUserName = name.name;
          });
        }
        });
        let messagesObj = data.messages;
        if(messagesObj !== undefined && messagesObj !== null){
          let newMessagesObj = $scope.assignUserMessagerClasses(messagesObj);
          $scope.thisConvosMessages = newMessagesObj;
        }

      }
    });
  };

  AuthFactory.getUser()
  .then(user => {
    $scope.uid = user.uid;
    $scope.listenToConvo($routeParams.convoid);
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });
  
  $scope.getConvo();



  // TODO: scroll the page to the bottom when a new message is sent

  
  $scope.sendNewMessage = (event)=>{
    // console.log('evetn',event);
    if(event.keyCode === 13){
      ProfileFactory.getUserProfileData($scope.uid)
      .then((theUser)=>{
        $scope.newMessage.userName = theUser.name;
        $scope.newMessage.uid = $scope.uid;
        $scope.newMessage.time = new Date().toLocaleString();
        
        ConversationFactory.saveNewMessage($scope.newMessage, $routeParams.convoid)
        .then((messageData)=>{
          console.log('swag',messageData);
        });
      });
    }
  };

  $scope.assignUserMessagerClasses=(messagesObj)=>{
    let keys = Object.keys(messagesObj);
    keys.forEach(key => messagesObj[key].msgID = key);
    let messagesArray = Object.values(messagesObj);
    messagesArray.forEach(msg =>{
      if(messagesObj[msg.msgID].uid === $scope.uid){
        messagesObj[msg.msgID].currentUser = true;
      }else if(messagesObj[msg.msgID].uid !== $scope.uid){
        messagesObj[msg.msgID].currentUser = false;
      }
    });
    return messagesObj;
  };

  // TODO: MAJOR TODO: make conversation page show other users name but not pull
  // it from the messages. it needs to display even if the other user has 
  // not sent any messages

  // TODO: MAJOR TODO: make message list page show names of 
  // other users instead of their UID

  // TODO: input box at the bottom to send a new message
  // when the message sends, it will save it to firebase,
  // and update the screen to show that new message,
  // which will be done with a new call to firebase

  // TODO: message object will contain uidm, message text,
  // and will be sent to the cid of that convo

  // TODO: add timestamp to messages

  // TODO: display name of the other user in the convo at the top of the page


};