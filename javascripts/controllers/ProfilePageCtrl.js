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
        guitar: user.guitar,
        bass: user.bass,
        drums: user.drums,
        vocals: user.vocals,
        keyboard: user.keyboard,
        violin: user.violin,

        instruments : user.instruments,
        interests : user.interests,
        experience : +user.experience,
        convos: user.convos,
        profilePicture: user.profilePicture
      };
    });
  };

  $scope.saveProfile = (newProfileObj) =>{
    console.log('instruments: ',$scope.instruments);
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


$scope.beginConvo = () =>{
  ConversationFactory.getUserConvoIds($scope.uid)
  .then((objectOfConvoIds)=>{
    if(objectOfConvoIds === null){
      $scope.makeNewConvo(); 
    }else{
      let arrayOfConvoIds = Object.values(objectOfConvoIds);
      let convoExists = false;

      /* jshint ignore:start */
      // while (convoExists === false) {
        for(let i = 0; i < arrayOfConvoIds.length; i++){
          let convoId = arrayOfConvoIds[i];
          ConversationFactory.checkForConvoBetweenTheseTwoUsers(convoId)
          .then((convoObj)=>{
            convoObj.convoId = convoId;
            if(convoObj.user1 === $routeParams.pid || convoObj.user2 === $routeParams.pid){
              convoExists = true;
              i = arrayOfConvoIds.length;
              $location.path(`/conversation/${convoObj.convoId}`);
            }else if(i === (arrayOfConvoIds.length - 1)){
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