"use strict";


// HOME PAGE CTRL
module.exports = function 
($scope, AuthFactory, $location, $window, ProfileFactory) {


  AuthFactory.authUser()
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
  
};
