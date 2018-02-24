"use strict";


// MESSAGES CTRL
module.exports = function
($scope, $location, AuthFactory, MessageFactory, $routeParams, ConversationFactory, $q){

  $scope.tempMessageList = [];

  // 2 factory functions. 1 that gets convos ordered by user1, and
  // another function that gets convos ordered by user2.
  // it checks that the uid of the currently logged in user is equal to either user1 or user 2
  // if it is true, then it adds the convo to an array. combines all the convos whether
  // the user is user1 or user2

  

  // BEGIN KEEP THIS
  AuthFactory.authUser()
  .then(user => {
    $scope.currentUserID = user.uid;
    let getConvosPromiseArray = [MessageFactory.getConvosByUser1($scope.currentUserID),MessageFactory.getConvosByUser2($scope.currentUserID)];
    $q.all(getConvosPromiseArray)
    .then((convosASHELLL)=>{
      console.log('convosASHELL',convosASHELLL);
      let convos1 = Object.values(convosASHELLL[0]);
      let convos2 = Object.values(convosASHELLL[1]);
      console.log('them convos1:::',convos1);
      console.log('them convos2:::',convos2);
      let allConvos = _.concat(convos1, convos2);
      console.log('allcvonso',allConvos);
    });
    // END KEEP THIS
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