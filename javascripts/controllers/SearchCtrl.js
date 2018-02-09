"use strict";

// SEARCH PAGE CTRL
module.exports = function
($scope, $location, AuthFactory, SearchFactory, $window){

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
  
  let userData=[];
  $scope.searchForUsers = () =>{
    $scope.filterArray = [$scope.instrumentSearch, $scope.interestSearch, $scope.experienceSearch, $scope.ageSearch];

    let counter = 0;
    $scope.filterArray.forEach(filter=>{if(filter === undefined){counter++;}
      else{
        switch(counter) {
          case 0:
            console.log('instrument search');
            SearchFactory.searchByInstrument($scope.filterArray[counter])
            .then((users)=>{
              console.log('users',users);
              $window.location.href = "#!/searchResults";
            });
            break;
          case 1:
            SearchFactory.searchByInterest($scope.filterArray[counter])
            .then((users)=>{
              console.log('users',users);
            });
            break;
          case 2:
            SearchFactory.searchByExperience($scope.filterArray[counter])
            .then((users)=>{
              console.log('users',users);
            });
            break;
          case 3:
            SearchFactory.searchByAge($scope.filterArray[counter])
            .then((users)=>{
              console.log('users',users);
            });
            break;
          default:
            console.log('no filters selected!!!');
      }
      }});
      if(counter === $scope.filterArray.length){$scope.showAlert = true;}

      console.log('filtersObj',$scope.filterArray);
      
    };
  // save filters to scope variable

  // require at least one filter to search users

  // receives back a list of other users, saves them to a scope variable,
  //  and redirects to searchResults page, which displays the list

};