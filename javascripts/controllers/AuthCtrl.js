"use strict";


// AUTH CTRL
module.exports = function($scope, AuthFactory, $location, $window){

  $scope.registerCTRLR = () => {
    console.log('fired register ctlr');
    AuthFactory.registerNewUser($scope.account)
    .then((data)=>{
      console.log('successful registration ctrlr ',data);
      $scope.loginCTRLR();
      $window.location.href = "#!/homePage";
      }).catch(err => console.log(err));
      // TODO: log the user in after registering

      // TODO: after registering, the user is taken to 
      // their profile page, where it can be edited

      // TODO: save the user to a user profile in FB that I can use, 
      // with uid, empty convos array, various profile stuff
    
  };

  $scope.loginCTRLR = ()=>{
    AuthFactory.loginWithEmailPassword($scope.account)
    .then((data)=>{
      console.log('successful login ctrlr!!!', data);
      let user = { "uid": data.uid };
      AuthFactory.postUserProfile(user)
      .then(response => {
        console.log('successful profile post',response);
        // $window.location.href = "#!/homePage";
      })
      .catch(err => console.log(err));
      // $window.location.href = "#!/homePage";
    }).catch((error)=>console.log('OHNOOO!', error));
  };

  $scope.logout = ()=>{
    AuthFactory.logout()
    .then((data)=>{
      console.log('logged out! ctrlr',data);
    });
  };

  AuthFactory.getUser()
  .then(user => {
    $location.path("/homePage");
  }).catch(err => console.log('error',err));
  // retrieves uid of user, to test against convo id and profile id


};