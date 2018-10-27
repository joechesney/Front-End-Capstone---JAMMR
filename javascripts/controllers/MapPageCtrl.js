"use strict";


// MESSAGES CTRL
module.exports = function
($scope, AuthFactory, $routeParams){

  $scope.userArray = [];

  if($routeParams.uid === undefined){
    AuthFactory.getAllUsers()
    .then((data)=>{
      let allUsers = Object.values(data);
      allUsers.forEach(user=>{
        if(user.latitude && user.longitude){
          $scope.userArray.push(user);
        }
      });
      $scope.allPinsMap = true;
    });
  } else {
    AuthFactory.getUserInfo($routeParams.uid)
    .then((user)=>{
      $scope.userArray.push(user);
      $scope.allPinsMap = false;
    });
  }


  $scope.showDetails = function (e, userObj) {
    $scope.selectedUser = userObj;
    $scope.map.showInfoWindow("infoWindow", userObj.uid);
  };


};