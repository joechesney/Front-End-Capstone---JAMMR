"use strict";

// SEARCH PAGE CTRL
module.exports = function
($scope, $location, AuthFactory, SearchFactory){

  $scope.test = "Search for dem bruhs here";
  $scope.test2 = "Search results as hell right here";

  AuthFactory.getUser()
  .then(user => {
    console.log('search for dudes/dudettes bruh', user);
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });

  
  // save filters to scope variable

  // require at least one filter to search users

  // need submit button to send search

  // receives back a list of other users, saves them to a scope variable,
  //  and redirects to searchResults page, which displays the list

};