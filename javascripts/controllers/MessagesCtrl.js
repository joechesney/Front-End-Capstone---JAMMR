"use strict";


// MESSAGES CTRL
module.exports = function
($scope, $location, AuthFactory, MessageFactory, $routeParams, ConversationFactory){

  $scope.tempMessageList = [];

  AuthFactory.getUser()
  .then(user => {
    $scope.currentUserID = user.uid;
    ConversationFactory.getUserConvoIds($scope.currentUserID)
    .then((objectOfConvoIds)=>{
      let arrayOfConvoIds = Object.values(objectOfConvoIds);
      // console.log('arrayofConvoIds',arrayOfConvoIds);
      arrayOfConvoIds.forEach(convoId=>{
        MessageFactory.getConvoInfo(convoId)
        .then((convoInfo)=>{
          let uidArray = [];
          uidArray.push(convoInfo.user1);
          uidArray.push(convoInfo.user2);
          uidArray.forEach(uid=>{
            // console.log('UID AFRRRRRRRRRRRRR',uid);
            if(uid !== $scope.currentUserID){
              AuthFactory.getUserName(uid)
              .then((name)=>{
                // console.log('name::EE*888888',name);
                convoInfo.otherUserName = name.name;
                // console.log('convoInfo',convoInfo);
              });
            }
          });
          $scope.tempMessageList.push(convoInfo);
        });
      });
    });
    $scope.conversationList = $scope.tempMessageList;
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });

  
  
  // TODO: Reorder conversations based on the most recent message. 
  // So, WHEN a new message has been sent in a conversation, 
  // then take that conversation id, and for both users, move it
  // to the front of their conversations array. that way, it will be
  // at the top of their conversation list when it displays.

  // Also, somehow display the most recent message on the convo block

};