"use strict";


// MESSAGES CTRL
module.exports = function
($scope, $location, AuthFactory, MessageFactory, $routeParams, ConversationFactory, $q){
  $scope.tempMessageList = [];
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
      let arrayOfAllConvoObjects = _.concat(convos1, convos2);
      console.log('arrayOfAllConvoObjects',arrayOfAllConvoObjects);
    
    // END KEEP THIS
    
      if(arrayOfAllConvoObjects.length === 0 || arrayOfAllConvoObjects.length === -1){
        console.log('no convos bro bro');
      }else{
        arrayOfAllConvoObjects.forEach(convoObj=>{
            if(convoObj.messages !== undefined){
              convoObj.recentMessage = convoObj.messages[Object.keys(convoObj.messages)[Object.keys(convoObj.messages).length-1]];
              convoObj.recentMessage.hour = convoObj.recentMessage.time.slice((convoObj.recentMessage.time.indexOf(',')+2));
            }
            let uidArray = [];
            uidArray.push(convoObj.user1);
            uidArray.push(convoObj.user2);
            uidArray.forEach(uid=>{
              if(uid !== $scope.currentUserID){
                AuthFactory.getUserInfo(uid)
                .then((otherUser)=>{
                  convoObj.otherUserName = otherUser.name;
                  convoObj.otherUserPic = otherUser.profilePicture;
                });
              }
            });
            $scope.tempMessageList.push(convoObj);
          });
          $scope.conversationList = $scope.tempMessageList;
        }
      });
    });
  };