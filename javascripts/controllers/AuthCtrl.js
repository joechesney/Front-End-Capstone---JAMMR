"use strict";


// AUTH CTRL
module.exports = function($scope, AuthFactory, $location, $window, $q){

  $scope.registerCTRLR = () => {
    console.log('fired register ctlr');
    AuthFactory.registerNewUser($scope.account)
    .then((data)=>{
      console.log('successful registration ctrlr ',data);
      $scope.loginCTRLR()
      .then((newdata)=>{
        AuthFactory.postUserProfile(data)
        .then(response => {
          console.log('successful profile post',response);
          $window.location.href = `#!/profilePage/${data.uid}`;
        }).catch(err => console.log(err));
        }).catch(err => console.log(err));
      });

      // TODO: after registering, the user is taken to 
      // their profile page, where it can be edited

      // TODO: save the user to a user profile in FB that I can use, 
      // with uid, empty convos array, various profile stuff
    
  };

  $scope.loginCTRLR = ()=>{
    return $q((resolve, reject)=>{
      AuthFactory.loginWithEmailPassword($scope.account)
      .then((data)=>{
        console.log('successful login ctrlr!!!', data);
        $window.location.href = "#!/homePage";
        resolve(data);
      }).catch((error)=>console.log('OHNOOO!', error));
    });
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