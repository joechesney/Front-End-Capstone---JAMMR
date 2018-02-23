"use strict";


// AUTH CTRL
module.exports = function($scope, AuthFactory, $location, $window, $q){

  $scope.registerCTRLR = () => {
    AuthFactory.registerNewUser($scope.account)
    .then((data)=>{
      $scope.loginCTRLR()
      .then((newdata)=>{
        AuthFactory.postUserProfile(data)
        .then(response => {
          console.log('successful profile post',response);
          $window.location.href = `#!/profilePage/${data.uid}`;
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    });
  };

  $scope.loginCTRLR = ()=>{
    return $q((resolve, reject)=>{
      AuthFactory.loginWithEmailPassword($scope.account)
      .then((data)=>{
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

  AuthFactory.authUser()
  .then(user => {
    $location.path("/homePage");
  }).catch(err => console.log('error',err));

};