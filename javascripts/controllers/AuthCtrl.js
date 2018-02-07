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
    .then(({data})=>{
      console.log('data',data);
      console.log('successful login!!!');
      $window.location.href = "#!/";
    });
  };

  // register new user
  
  // login user

  // checks auth of user

  // retrieves uid of user, to test against convo id and profile id


};