"use strict";


// PROFILE PAGE CTRL
module.exports = function
($scope, AuthFactory, SearchFactory, ProfileFactory, $window, $location){
  
  AuthFactory.getUser()
  .then(user => {
    // declare scope variables for user properties here
    $scope.uid = user.uid;
    $scope.getUserProfileDataCTRLR($scope.uid);
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });

  $scope.getUserProfileDataCTRLR = (uid) =>{
    ProfileFactory.getUserProfileData($scope.uid)
    .then((user)=>{
      console.log('user in profileData',user);
      $scope.picToDisplay = user.profilePicture;
      $scope.newProfileObj = {
        name : user.name,
        age : user.age,
        uid : user.uid,
        instruments : user.instruments,
        interests : user.interests,
        experience : user.experience,
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
  // TODO: replace sendMessage/editProfile button based on whether it is YOUR profile or someone elses


  // TODO: clicking sendMessage button redirects to either a NEW conversation with the user,
  // OR it goes to an existsing conversation
  // This logic will be tricky

  // TODO: some sort of image uploader to save profile images to firebase?
  // otherwise, images must link from a url

  // TODO: A NEW conversation will add THAT conversation id to the RECEIVING users profile
  // even if they have not responded yet. That way, they will be involved in the conversation,
  // even if they havent added a message to the conversation

  
};