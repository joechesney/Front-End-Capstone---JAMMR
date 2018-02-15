"use strict";


// HOME PAGE CTRL
module.exports = function 
($scope, AuthFactory, $location, $window, ProfileFactory) {

 // TODO: remove back button from the home page

  AuthFactory.getUser()
  .then(user => {
    ProfileFactory.getUserProfileData(user.uid)
    .then((user)=>{
      $scope.displayUserName = user.name;
      $scope.uid = user.uid;
    });
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });
  
  // TODO: move logout button to the home page??? and out of the navbar

  

};
