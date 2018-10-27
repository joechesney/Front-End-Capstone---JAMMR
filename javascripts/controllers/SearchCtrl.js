"use strict";


// SEARCH PAGE CTRL
module.exports = function
($scope, $location, AuthFactory, SearchFactory, $q){
  // ALL DATA:
  $scope.instruments = ["guitar", "bass", "drums", "vocals", "keyboard", "violin", "saxophone", "trumpet", "trombone"];
  $scope.interests = ["professionalBand", "hobbyBand", "jam", "chat", "learn", "session"];
  $scope.genres = ["pop", "rock", "rnb", "funk", "metal", "punk", "folk", "indie", "rap", "electronic"];


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
      $scope.experienceSearch, $scope.ageSearch, $scope.genreSearch];
    let promiseArray = [];
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
          case 4:
            promiseArray.push(SearchFactory.searchByGenre($scope.filterArray[index]));
            break;
          default:
            // console.log('no filters selected!!!');
      }
      }});
      $q.all(promiseArray)
      .then((data)=>{
        let lengthOfDataArray = data.length;
        let arrayOfMugs = [];
        switch (lengthOfDataArray) {
          case 0:
            $scope.showAlert = true;
            break;
          case 1:
            arrayOfMugs = _.intersectionBy(data[0], 'uid');
            // console.log('arrayOfMugs: ',arrayOfMugs);
            break;
          case 2:
            arrayOfMugs = _.intersectionBy(data[0], data[1], "uid");
            // console.log('arrayOfMugs: ',arrayOfMugs);
            break;
          case 3:
            arrayOfMugs = _.intersectionBy(data[0], data[1], data[2], "uid");
            // console.log('arrayOfMugs: ',arrayOfMugs);
            break;
          case 4:
            arrayOfMugs = _.intersectionBy(data[0], data[1], data[2], data[3], "uid");
            // console.log('arrayOfMugs: ',arrayOfMugs);
            break;
          case 4:
            arrayOfMugs = _.intersectionBy(data[0], data[1], data[2], data[3], data[4], "uid");
            // console.log('arrayOfMugs: ',arrayOfMugs);
            break;
          default:
            break;
        }


          let tempArray2 = _.uniqBy(arrayOfMugs, "uid");
          let tempArray3 = _.remove(tempArray2, (obj)=>{return obj.uid !== $scope.currentUser.uid;} );
          $scope.filteredUserArray = tempArray3;

      });

    };

};
