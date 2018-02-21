"use strict";


// MESSAGES CTRL
module.exports = function
($scope, AuthFactory, $routeParams, NgMap, MapFactory){


  AuthFactory.getAllUsers()
  .then((data)=>{
    console.log('data in mapPageCtrl:',data);
  });
  
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




  // all users should have a lat-long saved to their object,
  // that takes the zip code they type in on their profile page, 
  // and converts it to a lat/long BEFORE saving it. so the lat/lnog
  // is saved to their object instead of their zip code. or both?


  // function that needs to get all the users in the database, 
  // then put them all in an array. then assign that array of user objects 
  // to a scope variable that the ng-repeat will be run on
  
  // the second argument of the showInfoWindow function gives the function
  // the location to print the infoWindow. since the userObj.uid property is a 
  // string, it takes that value and looks for a pin on the map with the id 
  // that matches the userObj.uid that was passed in. this is just for render location

  // the marker id will be set to the uid of the user
  // showDeatils will pass in the user object
  // info-window needs to have an id that is passed in as the first argument 
  // to the $scope.map.showInfoWindow function inside of $scope.showDetails



};