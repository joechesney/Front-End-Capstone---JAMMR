"use strict";

const _ = require("lodash");

// SEARCH PAGE CTRL
module.exports = function
($scope, $location, AuthFactory, SearchFactory, $window){
  $scope.test2 = "search reslts here";
  // ALL DATA:
  $scope.instruments = ["guitar", "bass","violin"];
  $scope.interests = ["band", "jam","chat"];
  


  AuthFactory.getUser()
  .then(user => {
    // console.log('search for dudes/dudettes bruh', user);
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });
  
  
  $scope.searchForUsers = () =>{
    $scope.filterArray = [$scope.instrumentSearch, $scope.interestSearch, $scope.experienceSearch, $scope.ageSearch];
  

    $scope.userArray = [];
    let counter = 0;
    $scope.filterArray.forEach((filter, index)=>{if(filter === undefined){counter++;}
      else{
        switch(index) {
          case 0:
            console.log('instrument search');
            SearchFactory.searchByInstrument($scope.filterArray[index])
            .then((users)=>{
              console.log('users instrument',users);
              users.forEach(user=>{$scope.userArray.push(user);});
            });
            break;
          case 1:
            SearchFactory.searchByInterest($scope.filterArray[index])
            .then((users)=>{
              console.log('users interest',users);
              users.forEach(user=>{$scope.userArray.push(user);});
            });
            break;
          case 2:
            SearchFactory.searchByExperience($scope.filterArray[index])
            .then((users)=>{
              console.log('users experience',users);
              users.forEach(user=>{$scope.userArray.push(user);});
            });
            break;
          case 3:
            SearchFactory.searchByAge($scope.filterArray[index])
            .then((users)=>{
              console.log('users age',users);
              users.forEach(user=>{$scope.userArray.push(user);});
            });
            break;
          default:
            console.log('no filters selected!!!');
      }
      }});
      if(counter === $scope.filterArray.length){$scope.showAlert = true;}

      
    };


    function removeDuplicateUsingFilter(arr){
      let unique_array = arr.filter(function(elem, index, self) {
          return index == self.indexOf(elem);
      });
      return unique_array;
    }


    // TODO: make it so that the user that is making 
    // the search does not show up IN the search results

    // TODO: use lodash to make sure there are no duplicate entries in the userArray


  // receives back a list of other users, saves them to a scope variable,
  //  and redirects to searchResults page, which displays the list

};