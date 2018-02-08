"use strict";


// PROFILE PAGE CTRL
module.exports = function
($scope, $location, AuthFactory, SearchFactory, ProfileFactory){

  $scope.test = "Profile here";
  
  AuthFactory.getUser()
  .then(user => {
    console.log('profile, my dude', user);
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });

  
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