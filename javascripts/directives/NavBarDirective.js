'use strict';



module.exports =  function () {
  return {
    restrict: 'E',
    templateUrl: 'partials/navbar.html',
    controller: 'NavBarCtrl',
    scope: {
        back: '@back',
        forward: '@forward',
        icons: '@icons'
    },
    link: function($scope, element, attrs) {
      document.getElementById('backButton').addEventListener("click", function($scope){
        window.history.back();
      });
    }
  };
};