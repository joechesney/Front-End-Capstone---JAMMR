"use strict";


// NAVBAR CTRL
module.exports = function($scope, $window, $location, AuthFactory){

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

  //TODO: make this controller also check for a user, 
  // then display that user's name in the navbar. swag

  $scope.title = "JAMMR";
};