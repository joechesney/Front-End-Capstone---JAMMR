"use strict";


// MESSAGES CTRL
module.exports = function
($scope, AuthFactory, MessageFactory, $q){
  $scope.tempMessageList = [];
  // BEGIN KEEP THIS
  AuthFactory.authUser()
  .then(user => {
    $scope.currentUserID = user.uid;
    let getConvosPromiseArray = [MessageFactory.getConvosByUser1($scope.currentUserID),MessageFactory.getConvosByUser2($scope.currentUserID)];
    $q.all(getConvosPromiseArray)
    .then((convosASHELLL)=>{
      let convos1 = Object.values(convosASHELLL[0]);
      let convos2 = Object.values(convosASHELLL[1]);
      let arrayOfAllConvoObjects = _.concat(convos1, convos2);
    // END KEEP THIS

      if(arrayOfAllConvoObjects.length === 0 || arrayOfAllConvoObjects.length === -1){
        // console.log('no convos bro bro');
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