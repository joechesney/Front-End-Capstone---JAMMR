"use strict";


// AUTH CTRL
module.exports = function($scope, AuthFactory, $location, $window){

  $scope.registerCTRLR = () => {
    console.log('fired register ctlr');
    AuthFactory.registerNewUser($scope.account)
    .then((data)=>{
      console.log('data in ctrler ',data);
      // TODO: save the user to a user profile in FB that I can use, 
      // with uid, empty convos array, various profile stuff
    });
  };

  $scope.loginCTRLR = ()=>{
    AuthFactory.loginWithEmailPassword($scope.account)
    .then((data)=>{
      console.log('data after login in controller',data);
      console.log('successful login!!!');
      $window.location.href = "#!/homePage";
    })
    .catch((error)=>{
      console.log('OHNOOO!');
    });
  };

  $scope.logout = ()=>{
    AuthFactory.logout()
    .then((data)=>{
      console.log('data from logging out',data);
    });
  };

  // checks auth of user
  AuthFactory.getUser()
  .then(user => {
    $location.path("/homePage");
  }).catch(err => console.log('error',err));
  // retrieves uid of user, to test against convo id and profile id


};