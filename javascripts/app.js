"use strict";

const angular = require('angular'); // it knows where it is, from node modules
const ngRoute = require('angular-route');
const firebase = require('firebase');
// Other dependencies below

const app = angular.module('JAMMRApp', [ngRoute]); // name of app


// this is requiring the controllers and factories folders for you
require('./factories');
require('./controllers');


// Put routes here

app.config($routeProvider => {
  $routeProvider

  // routes and configs go here, chained onto the module definition
  
  
  .when("/", {
      templateUrl: "partials/homePage.html",
      controller: "HomeCtrl"
  });
  
  
});

// .run((FBCreds, PinFactory) => {
// firebase.initializeApp(FBCreds);
// });



module.exports = app;