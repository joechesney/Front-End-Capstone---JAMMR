"use strict";

// SEARCH PAGE CTRL
module.exports = function
($scope, $location, AuthFactory, SearchFactory){

  // ALL DATA:
  $scope.instruments = ["guitar", "bass","violin"];
  $scope.interests = ["band", "jam","chat"];
  // $scope.experiences = {filter: "age", ages: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]};
  // $scope.ages = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];


  AuthFactory.getUser()
  .then(user => {
    console.log('search for dudes/dudettes bruh', user);
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });
  
  
  $scope.searchForUsers = () =>{
    $scope.filterArray = [$scope.instrumentSearch, $scope.interestSearch, $scope.experienceSearch, $scope.ageSearch];

    let counter = 0;
    $scope.filterArray.forEach(filter=>{
      if(filter === undefined){counter++;}else{/* run filter function here */}
    });

    if(counter === $scope.filterArray.length){
      $scope.showAlert = true;
    }
    console.log('filtersObj',$scope.filterArray);
  };
  // save filters to scope variable

  // require at least one filter to search users

  // receives back a list of other users, saves them to a scope variable,
  //  and redirects to searchResults page, which displays the list

};