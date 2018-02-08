"use strict";


// HOME PAGE CTRL
module.exports = function 
($scope, AuthFactory, $location, $window) {

 // TODO: remove back button from the home page

  AuthFactory.getUser()
  .then(user => {
    console.log('welcome home bruh', user);
    $scope.displayUserName = user.displayName;
    $scope.userEmail = user.email;
    $scope.uid = user.uid;
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });
  

};


