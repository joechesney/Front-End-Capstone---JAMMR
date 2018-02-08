"use strict";


// PROFILE PAGE CTRL
module.exports = function
($scope, $location, AuthFactory, SearchFactory, ProfileFactory){
  
  AuthFactory.getUser()
  .then(user => {
    console.log('profile, my dude', user);
    // declare scope variables for user properties here
    $scope.uid = user.uid;
    ProfileFactory.getUserProfileData($scope.uid)
    .then((user)=>{
      console.log('user in profileData',user);
      $scope.name = user.name;
      console.log('scope name',$scope.name);
      $scope.age = user.age;
      $scope.uid = user.uid;
      $scope.instruments = user.instruments;
      $scope.interests = user.interests;
      $scope.experience = user.experience;
    });

  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });


  $scope.saveProfile = () =>{
    // calls a factory function to save the updated information
    // THEN calls a factory function to GET the profile again
  };
  // replace sendMessage/editProfile button based on whether it is YOUR profile or someone elses


  // clicking sendMessage button redirects to either a NEW conversation with the user,
  // OR it goes to an existsing conversation
  // This logic will be tricky

  // when user clicks editProfile button, the profile fields will change to input fields 
  // and maybe have a colored border to indicate that theyre currently being edited

  // some sort of image uploader to save profile images to firebase?
  // otherwise, images must link from a url

  // save any profile changes to firebase under that users profile

  // TODO: A NEW conversation will add THAT conversation id to the RECEIVING users profile
  // even if they have not responded yet. That way, they will be involved in the conversation,
  // even if they havent added a message to the conversation

  
};