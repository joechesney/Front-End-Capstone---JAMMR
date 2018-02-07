'use strict';



module.exports =  function () {
  return {
    restrict: 'E',
    templateUrl: 'partials/navbar.html',
    controller: 'NavBarCtrl',
    // template: '<button class="btn">{{back}}</button><button class="btn">{{forward}}</button>',
    scope: {
        back: '@back',
        forward: '@forward',
        icons: '@icons'
    },
    link: function($scope, element, attrs) {
      // $(element[0]).on('click', function() {
      //     history.back();
      //     scope.$apply();
      // });
      document.getElementById('backButton').addEventListener("click", function($scope){
        window.history.back();
      });
    }
  };
};