"use strict";


// NAVBAR CTRL
module.exports = function($scope, $window, $location, AuthFactory){

  $scope.isActive = function (path) {
    let currentPath = $location.path().split('/')[1];
    if (currentPath.indexOf('?') !== -1)
      currentPath = currentPath.split('?')[0];
      return currentPath === path.split('/')[1];
  };
  $scope.clickLogout = () =>
    AuthFactory.logout()
    .then(() => $window.location.href = "#!/login");

  $scope.test = "superchcuppspss";
};