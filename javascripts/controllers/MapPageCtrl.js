"use strict";


// MESSAGES CTRL
module.exports = function
($scope, AuthFactory, $routeParams, NgMap, MapFactory){

  // TODO: when you look at a specific person on the map page,
  // it should show YOUR pin too, so you can see how far away they are
  // TODO: also maybe, on the profile page, have it calculate the miles
  // between your pin and their pin, so you can see how far away they are

// TODO: add whether they have a practice space to the user object/profile
// if it is true, then maybe give them a styled border on the profile and map somehow??

  $scope.userArray = [];
  console.log('map page route parms:',$routeParams.uid);
  if($routeParams.uid === undefined){
    AuthFactory.getAllUsers()
    .then((data)=>{
      let allUsers = Object.values(data);
      console.log('data in mapPageCtrl:',allUsers);
      allUsers.forEach(user=>{
        if(user.latitude && user.longitude){
          $scope.userArray.push(user);
          console.log('all users if no speific user: ',user);
        }
      });
    });
  } else {
    AuthFactory.getUserInfo($routeParams.uid)
    .then((user)=>{
      console.log('userInfo for one user: ',user);
      $scope.userArray.push(user);
    });
  }

  // TODO: remove maximize button, satellite button, and street view button on map

  $scope.showDetails = function (e, userObj) {
    $scope.selectedUser = userObj;
    $scope.map.showInfoWindow("infoWindow", userObj.uid);
  };




  // TODO: all users should have a lat-long saved to their object,
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