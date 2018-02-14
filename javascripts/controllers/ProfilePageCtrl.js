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
      console.log('user in profileData',user);
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
    .then((data)=>{
      let brandNewConvoId = data.name;
      ProfileFactory.addConvoToUserObjects($scope.uid, brandNewConvoId)
      .then((data)=>{
        ProfileFactory.addConvoToUserObjects($routeParams.pid, brandNewConvoId)
        .then((data)=>{
          $location.path(`/conversation/${data.name}`);
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
        arrayOfConvoIds.forEach(convoId =>{
          ConversationFactory.checkForConvoBetweenTheseTwoUsers(convoId)
          .then((convo)=>{
            convo.convoId = convoId;
            if(convo.user1 === $routeParams.pid || convo.user2 === $routeParams.pid){
              convoExists = true;
              $location.path(`/conversation/${convo.convoId}`);
            }else if(convoExists === false){
              $scope.makeNewConvo(); 
              convoExists = true;

            }
          });
        });
      } // end of else
    });
  };

};