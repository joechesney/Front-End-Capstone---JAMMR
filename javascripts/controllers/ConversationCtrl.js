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
          $scope.thisConvosMessages = newMessagesObj;
        }
        // document.getElementById("conversationBox").scrollTop = document.getElementById("conversationBox").scrollHeight;
      }
      // document.getElementById("conversationBox").scrollTop = document.getElementById("conversationBox").scrollHeight;

    });
  };

  

  // TODO: add delete button to messages

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
    if(event.keyCode === 13){
      ProfileFactory.getUserProfileData($scope.uid)
      .then((theUser)=>{
        $scope.newMessage.userName = theUser.name;
        $scope.newMessage.uid = $scope.uid;
        $scope.newMessage.time = new Date().toLocaleString();
        
        ConversationFactory.saveNewMessage($scope.newMessage, $routeParams.convoid)
        .then((messageData)=>{
          console.log('swag',messageData);
          // document.getElementById("conversationBox").scrollTop = document.getElementById("conversationBox").scrollHeight;

          setTimeout(() => {
            document.getElementById("conversationBox").scrollTop = document.getElementById("conversationBox").scrollHeight;
            console.log('timeoutAF');
          }, 50);
        });
      });
    }
  };

  // TODO: make sure each partial has a containerBox around it so it fits under navbar

  // TODO: fix the creating of a new convo when the users already have one

  // TODO: name on each message should grab the name from the user object, not save it to the message object



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



};


// TODO: use skeleton or some other cool styling framework 