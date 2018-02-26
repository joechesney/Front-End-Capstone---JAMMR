"use strict";


// SEARCH PAGE CTRL
module.exports = function
($scope, $location, AuthFactory, SearchFactory, $window, $q){
  // ALL DATA:
  $scope.instruments = ["guitar", "bass", "drums", "vocals", "keyboard", "violin", "saxophone", "trumpet", "trombone"];
 $scope.interests = ["professionalBand", "hobbyBand", "jam", "chat", "learn", "session"];
  
  AuthFactory.authUser()
  .then(user => {
    $scope.currentUser = user;
    AuthFactory.getUserInfo(user.uid)
    .then((name)=>{
      $scope.currentUserName = name.name;
    });
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });
  
  
  $scope.searchForUsers = () =>{
    $scope.filterArray = [$scope.instrumentSearch, $scope.interestSearch, 
      $scope.experienceSearch, $scope.ageSearch];
    let promiseArray = [];
    let tempArray = [];
    let counter = 0;
    $scope.filterArray.forEach((filter, index)=>{if(filter === undefined){counter++;}
      else{
        switch(index) {
          case 0:
            promiseArray.push(SearchFactory.searchByInstrument($scope.filterArray[index]));
            break;
          case 1:
            promiseArray.push(SearchFactory.searchByInterest($scope.filterArray[index]));
            break;
          case 2:
            promiseArray.push(SearchFactory.searchByExperience($scope.filterArray[index]));
            break;
          case 3:
            promiseArray.push(SearchFactory.searchByAge($scope.filterArray[index]));
            break;
          default:
            // console.log('no filters selected!!!');
      }
      }});
      $q.all(promiseArray)
      .then((data)=>{
        data.forEach(dataArray=>{
          dataArray.forEach(user=>{
            tempArray.push(user);
          });
        });
        if(counter === ($scope.filterArray.length)){$scope.showAlert = true;}
        else{
          let tempArray2 = _.uniqBy(tempArray, "uid");
          let tempArray3 = _.remove(tempArray2, (obj)=>{return obj.uid !== $scope.currentUser.uid;} );
          $scope.filteredUserArray = tempArray3;
        }
      });

      // TODO: This isnt working after my refactor. Will fix later
    };
    
};
