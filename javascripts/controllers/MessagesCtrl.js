"use strict";


// MESSAGES CTRL
module.exports = function
($scope, $location, AuthFactory, MessageFactory, $routeParams, ConversationFactory){

  $scope.tempMessageList = [];

  AuthFactory.authUser()
  .then(user => {
    $scope.currentUserID = user.uid;
    ConversationFactory.getUserConvoIds($scope.currentUserID)
    .then((objectOfConvoIds)=>{
      if(objectOfConvoIds === null || objectOfConvoIds === undefined){
        console.log('no convos bro bro');
      }else{
        let arrayOfConvoIds = Object.values(objectOfConvoIds);
        arrayOfConvoIds.forEach(convoId=>{
          MessageFactory.getConvoInfo(convoId)
          .then((convoInfo)=>{
            // console.log('convoInfo',convoInfo);
            if(convoInfo.messages !== undefined){
              convoInfo.recentMessage = convoInfo.messages[Object.keys(convoInfo.messages)[Object.keys(convoInfo.messages).length-1]];
            }
            convoInfo.recentMessage.hour = convoInfo.recentMessage.time.slice((convoInfo.recentMessage.time.indexOf(',')+2));
            let uidArray = [];
            // console.log('convoInfoq',convoInfo);
            uidArray.push(convoInfo.user1);
            uidArray.push(convoInfo.user2);
            uidArray.forEach(uid=>{
              if(uid !== $scope.currentUserID){
                AuthFactory.getUserInfo(uid)
                .then((otherUser)=>{
                  convoInfo.otherUserName = otherUser.name;
                  convoInfo.otherUserPic = otherUser.profilePicture;
                });
              }
            });
            $scope.tempMessageList.push(convoInfo);
          });
        });
      }
      $scope.conversationList = $scope.tempMessageList;
    }).catch(err => {
      console.log('error',err);
      $location.path("/registerLogin");
    });
  });


};