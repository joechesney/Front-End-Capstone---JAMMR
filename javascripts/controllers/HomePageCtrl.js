"use strict";


// HOME PAGE CTRL
module.exports = function ($scope, AuthFactory, $location, $window) {

  // needs to check authorization and maybe display username on home page?
  // not much else going on on the home page
  // on home page, remove back button from the page

  AuthFactory.getUser()
  .then(user => {
    // $location.path("/homePage");
    console.log('welcome bruh');
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });
  // AuthFactory.getUser()
  // .then

};


