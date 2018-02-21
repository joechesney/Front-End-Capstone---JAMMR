"use strict";


// MESSAGES CTRL
module.exports = function
($scope, $location, AuthFactory, MessageFactory, $routeParams, ConversationFactory, NgMap){

  
  $scope.testUser = {
    name: "Joe Dih",
    age: 27,
    guitar: true,
    uid: "12345"
  };
  $scope.userArray = [$scope.testUser];

  $scope.showDetails = function (e, userObj) {
    $scope.selectedUser = userObj;
    $scope.map.showInfoWindow("testMarker", userObj.uid);
  };
};