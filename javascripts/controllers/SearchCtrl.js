"use strict";


// SEARCH PAGE CTRL
module.exports = function
($scope, $location, AuthFactory, SearchFactory, $window, $q){
  // ALL DATA:
  $scope.instruments = ["guitar", "bass", "drums", "vocals", "keyboard", "violin", "saxophone", "trumpet", "trombone"];
 $scope.interests = ["professionalBand", "hobbyBand", "jam", "chat", "learn", "session"];
  
  AuthFactory.getUser()
  .then(user => {
    $scope.currentUser = user;
    AuthFactory.getUserName(user.uid)
    .then((name)=>{
      $scope.currentUserName = name.name;
    });
    // console.log('search for dudes/dudettes bruh', user);
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
            console.log('instrument search');
            promiseArray.push(SearchFactory.searchByInstrument($scope.filterArray[index]));
            // SearchFactory.searchByInstrument($scope.filterArray[index])
            // .then((users)=>{
            //   console.log('users instrument',users);
            //   users.forEach(user=>{$scope.userArray.push(user);});
            // });
            break;
          case 1:
            promiseArray.push(SearchFactory.searchByInterest($scope.filterArray[index]));
            // SearchFactory.searchByInterest($scope.filterArray[index])
            // .then((users)=>{
            //   console.log('users interest',users);
            //   users.forEach(user=>{$scope.userArray.push(user);});
            // });
            break;
          case 2:
            promiseArray.push(SearchFactory.searchByExperience($scope.filterArray[index]));
            // SearchFactory.searchByExperience($scope.filterArray[index])
            // .then((users)=>{
            //   console.log('users experience',users);
            //   users.forEach(user=>{$scope.userArray.push(user);});
            // });
            break;
          case 3:
            promiseArray.push(SearchFactory.searchByAge($scope.filterArray[index]));
            // SearchFactory.searchByAge($scope.filterArray[index])
            // .then((users)=>{
            //   console.log('users age',users);
            //   users.forEach(user=>{$scope.userArray.push(user);});
            // });
            break;
          default:
            console.log('no filters selected!!!');
      }
      }});
      $q.all(promiseArray)
      .then((data)=>{
        console.log('data after promise all',data);
        data.forEach(dataArray=>{
          dataArray.forEach(user=>{
            tempArray.push(user);
          });
        });
        console.log('temparray',tempArray);
        let tempArray2 = _.uniqBy(tempArray, "uid");
        let tempArray3 = _.remove(tempArray2, (obj)=>{return obj.uid !== $scope.currentUser.uid;} );
        console.log('temparray2',tempArray2);
        console.log('temparray3',tempArray3);
        $scope.filteredUserArray = tempArray3;
      });

      if(counter === ($scope.filterArray.length-1)){$scope.showAlert = true;}

      // use filter function here and return new array as scope variable for partial to read from
    };


    // TODO: make it so that the user that is making 
    // the search does not show up IN the search results. do this in 
    // the nested forEach loop described below. if a duplicate is found OR 
    // if the logged-in user is found, then remove it from the array
    // BEFORE assigning array to the scope variable to be printed

    // TODO: filter maybe by running a nested for each on the array of user objects
    // inside the nested foreach check that the uid is the EXACT same one &&
    // that the index of user object is NOT THE SAME. 
    
    // TODO: use lodash to make sure there are no duplicate entries in the userArray

    // TODO: Refactor to rename 'messages' page 'AllConversations' or something more clear
};