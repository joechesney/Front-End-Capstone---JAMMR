"use strict";

const firebase = require('firebase');

// CONVERSATION CTRL
module.exports = function
($scope, AuthFactory, $location, MessageFactory, 
  ConversationFactory, $routeParams, ProfileFactory){

  $scope.listenToConvo = (convoId)=>{
    let JAMMRDatabase = firebase.database().ref("convos/"+convoId);
    JAMMRDatabase.on('value', (snapshot) => {
      // console.log('snapshot when convo changes::',snapshot.val());
      $scope.getConvo();
      // document.getElementById("conversationBox").scrollTop = document.getElementById("conversationBox").scrollHeight;
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
          let newMessagesObj = $scope.assignUserMessageClasses(messagesObj);
          let newMessagesObjWithNames = $scope.assignUserNamesToMessages(newMessagesObj);
          $scope.thisConvosMessages = newMessagesObjWithNames;
        }
      }
      setTimeout(() => {
        document.getElementById("conversationBox").scrollTop = document.getElementById("conversationBox").scrollHeight;
        console.log('timeoutAF');
      }, 50);
    });
  };

  // TODO: test that the convo is scrolling down when the convo is long as hell
  
  // TODO: add delete button to messages

  AuthFactory.getUser()
  .then(user => {
    $scope.uid = user.uid;
    AuthFactory.getUserName($scope.uid)
    .then((name)=>{
      $scope.currentUserName = name.name;
    });
    $scope.listenToConvo($routeParams.convoid);
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });

  $scope.getConvo();

  
  $scope.sendNewMessage = (event)=>{
    if(event.keyCode === 13 && $scope.newMessage !== undefined){
      ProfileFactory.getUserProfileData($scope.uid)
      .then((theUser)=>{
        $scope.newMessage.uid = $scope.uid;
        $scope.newMessage.time = new Date().toLocaleString();
        
        ConversationFactory.saveNewMessage($scope.newMessage, $routeParams.convoid)
        .then((messageData)=>{
          // document.getElementById("conversationBox").scrollTop = document.getElementById("conversationBox").scrollHeight;
          setTimeout(() => {
            document.getElementById("conversationBox").scrollTop = document.getElementById("conversationBox").scrollHeight;
            console.log('timeoutAF');
          }, 50);
        });
        $scope.newMessage.text = "";
      });
    }
  };

  // TODO: make sure each partial has a containerBox around it so it fits under navbar

  $scope.assignUserMessageClasses=(messagesObj)=>{
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

  $scope.assignUserNamesToMessages = (newMessagesObj)=>{
    let keys = Object.keys(newMessagesObj);
    keys.forEach(key => newMessagesObj[key].msgID = key);
    let messagesArray = Object.values(newMessagesObj);
    messagesArray.forEach(msg =>{
      if(newMessagesObj[msg.msgID].uid === $scope.uid){
        newMessagesObj[msg.msgID].userName = $scope.currentUserName;
      }else if(newMessagesObj[msg.msgID].uid !== $scope.uid){
        newMessagesObj[msg.msgID].userName = $scope.otherUserName;
      }
    });
    return newMessagesObj;
  };

  $scope.deleteMessage = (message)=>{
    ConversationFactory.deleteMessageFromFireBaseForever(message.msgID, $routeParams.convoid)
    .then((response)=>{
    });
  };


};


// TODO: use skeleton or some other cool styling framework 