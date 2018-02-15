"use strict";


// NAVBAR CTRL
module.exports = function
($scope, $window, $location, AuthFactory){

  // TODO: make navbar a grid so the back button looks better, and the logo is centered

  $scope.title = "JAMMR";
  if($window.location.href === "#!/registerLogin" ||
    $window.location.href === "#!/homePage"){
    $scope.isHomeorLoginPage = false;
  }else{
    $scope.isHomeorLoginPage = true;
  } // TODO: this isnt working lol
  
  $scope.isActive = function (path) {
    let currentPath = $location.path().split('/')[1];
    if (currentPath.indexOf('?') !== -1)
      currentPath = currentPath.split('?')[0];
      return currentPath === path.split('/')[1];
  };
  $scope.logout = () =>{
    AuthFactory.logout()
    .then((data) => {
      console.log('successful logout', data);
      $window.location.href = "#!/registerLogin";
    });
  };
  AuthFactory.getUser()
  .then(user => {
    console.log('navbar breh', user);
    AuthFactory.getUserName(user.uid)
    .then((data)=>{
      console.log('data in vabar HWUTCHU WANT',data);
      $scope.userName = data.name;
    });
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });


};