"use strict";
// it knows where it is, from node modules
const angular = require('angular'); 
const ngRoute = require('angular-route');
const firebase = require('firebase');
const ngMap = require('ngmap');


// Other dependencies below
const app = angular.module('JAMMRApp', [ngRoute, ngMap]); // name of app. app definition
// this is requiring the controllers and factories folders for you,
// because of the index.js files in those folders
require('./factories');
require('./controllers');
require('./directives');
require('./secrets');

// Put routes here

app
.constant("listenToDatabase", () => {
  let JAMMRDatabase = firebase.database().ref();
  JAMMRDatabase.on('value', (snapshot) => {
      // console.log('snapshot',snapshot.val());
  });
})
.config($routeProvider => {
  $routeProvider

  // routes and configs go here, chained onto the module definition
  .when("/registerLogin", {
      templateUrl: "partials/registerLogin.html",
      controller: "AuthCtrl"
  })
  .when("/profilePage/:pid", {
    templateUrl: "partials/profilePage.html",
    controller: "ProfilePageCtrl"
  })
  .when("/messages", {
    templateUrl: "partials/messagesPage.html",
    controller: "MessagesCtrl"
  })
  .when("/conversation/:convoid", {
    templateUrl: "partials/conversation.html",
    controller: "ConversationCtrl"
  })
  .when("/searchPage", {
    templateUrl: "partials/searchPage.html",
    controller: "SearchCtrl"
  })
  .when("/homePage", {
    templateUrl: "partials/homePage.html",
    controller: "HomePageCtrl"
  })
  .when("/mapPage/:uid", {
    templateUrl: "partials/mapPage.html",
    controller: "MapPageCtrl"
  })
  .when("/mapPage", {
    templateUrl: "partials/mapPage.html",
    controller: "MapPageCtrl"
  })
  .otherwise("/registerLogin");
})
.run((fbConfig, listenToDatabase) => {
  firebase.initializeApp(fbConfig);
  listenToDatabase();
});



module.exports = app; // this is necessary for some reason