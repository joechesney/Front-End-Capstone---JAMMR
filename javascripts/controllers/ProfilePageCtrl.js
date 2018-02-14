"use strict";


// PROFILE PAGE CTRL
module.exports = function
($scope, AuthFactory, SearchFactory, ProfileFactory, $window, 
  $location, $routeParams, ConversationFactory){
  
  AuthFactory.getUser()
  .then(user => {
    $scope.uid = user.uid;
    if($scope.uid === $routeParams.pid){$scope.myProfile = true;}else{$scope.myProfile = false;}
    $scope.getUserProfileDataCTRLR();
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });

  $scope.getUserProfileDataCTRLR = () =>{
    ProfileFactory.getUserProfileData($routeParams.pid)
    .then((user)=>{
      $scope.picToDisplay = user.profilePicture;
      $scope.newProfileObj = {
        name : user.name,
        age : +user.age,
        uid : user.uid,
        instruments : user.instruments,
        interests : user.interests,
        experience : +user.experience,
        convos: user.convos,
        profilePicture: user.profilePicture
      };
    });
  };

  $scope.saveProfile = (newProfileObj) =>{
    ProfileFactory.saveProfileWithChanges(newProfileObj)
    .then(({data})=>{
      console.log('data after its sent, back in ctlr',data);
      $scope.editing = false;
      $scope.getUserProfileDataCTRLR(data.uid);
    });
  };

  //TODO: make "interests" section a list of checkboxes in 'edit' mode

  // TODO: some sort of image uploader to save profile images to firebase?
  // otherwise, images must link from a url

  $scope.makeNewConvo = ()=>{
    let newConvoObj = {
      user1: $scope.uid,
      user2: $routeParams.pid
    };
    ProfileFactory.createNewConvoObject(newConvoObj)
    .then((data1)=>{
      let brandNewConvoId = data1.name;
      ProfileFactory.addConvoToUserObjects($scope.uid, brandNewConvoId)
      .then((data2)=>{
        ProfileFactory.addConvoToUserObjects($routeParams.pid, brandNewConvoId)
        .then((data3)=>{
          $location.path(`/conversation/${data1.name}`);
        });
      });
    });
  };


//   $scope.beginConvo = () =>{
//     ConversationFactory.getUserConvoIds($scope.uid)
//     .then((objectOfConvoIds)=>{
//       if(objectOfConvoIds === null){
//         $scope.makeNewConvo(); 
//       }else{
//         console.log('objectofConvoIds',objectOfConvoIds);
//         let arrayOfConvoIds = Object.values(objectOfConvoIds);
//         console.log('arrayOfConvoIds',arrayOfConvoIds);
//         let convoExists = false;
//         arrayOfConvoIds.forEach(convoId =>{
//           console.log('convoId',convoId);
//           ConversationFactory.checkForConvoBetweenTheseTwoUsers(convoId)
//           .then((convo)=>{
//             console.log('convo',convo);
//             convo.convoId = convoId;
//             if(convo.user1 === $routeParams.pid || convo.user2 === $routeParams.pid){
//               convoExists = true;
//               $location.path(`/conversation/${convo.convoId}`);
//             }else if(convoExists === false){
//               $scope.makeNewConvo(); 
//               convoExists = true;
//             }
//           });
//         });
//       } // end of else
//     });
//   };
// };

$scope.beginConvo = () =>{
  ConversationFactory.getUserConvoIds($scope.uid)
  .then((objectOfConvoIds)=>{
    if(objectOfConvoIds === null){
      $scope.makeNewConvo(); 
    }else{
      console.log('objectofConvoIds',objectOfConvoIds);
      let arrayOfConvoIds = Object.values(objectOfConvoIds);
      console.log('arrayOfConvoIds',arrayOfConvoIds);
      let convoExists = false;

      /* jshint ignore:start */
      // while (convoExists === false) {
        for(let i = 0; i < arrayOfConvoIds.length; i++){
          let convoId = arrayOfConvoIds[i];
          console.log('the first i: ',i);
          console.log('convoId',convoId);
          ConversationFactory.checkForConvoBetweenTheseTwoUsers(convoId)
          .then((convoObj)=>{
            console.log('convoObj',convoObj);
            convoObj.convoId = convoId;
            if(convoObj.user1 === $routeParams.pid || convoObj.user2 === $routeParams.pid){
              convoExists = true;
              i = arrayOfConvoIds.length;
              console.log('old convo found! ', i);
              $location.path(`/conversation/${convoObj.convoId}`);
            }else if(i === (arrayOfConvoIds.length - 1)){
              console.log('new convo created here ',i);
              $scope.makeNewConvo(); 
              convoExists = true;
            }
          });
        }
        
      // }
      /* jshint ignore:end */
    } // end of else
  });
};
};