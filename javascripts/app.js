"use strict";
// it knows where it is, from node modules
const angular = require('angular'); 
const ngRoute = require('angular-route');
const firebase = require('firebase');
// const fbConfig = require("./secrets/fbConfig");
// console.log('fbconfig',fbConfig);


// Other dependencies below
const app = angular.module('JAMMRApp', [ngRoute]); // name of app. app definition
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
  console.log('JAMMRDatabase',JAMMRDatabase);
  JAMMRDatabase.on('value', (snapshot) => {
      console.log('snapshot',snapshot.val());
  });
})
.config($routeProvider => {
  $routeProvider

  // routes and configs go here, chained onto the module definition
  .when("/registerLogin", {
      templateUrl: "partials/registerLogin.html",
      controller: "AuthCtrl"
  })
  .when("/profile", {
    templateUrl: "partials/profilePage.html",
    controller: "ProfilePageCtrl"
  })
  .when("/messages", {
    templateUrl: "partials/messagesPage.html",
    controller: "MessagesCtrl"
  })
  .when("/conversation", {
    templateUrl: "partials/conversation.html",
    controller: "ConversationCtrl"
  })
  .when("/searchResults", {
    templateUrl: "partials/searchResults.html",
    controller: "SearchCtrl"
  })
  .when("/searchPage", {
    templateUrl: "partials/searchPage.html",
    controller: "SearchCtrl"
  })
  .when("/", {
    templateUrl: "partials/homePage.html",
    controller: "HomePageCtrl"
  })
  .otherwise("/registerLogin");
  
  
})
.run((fbConfig, listenToDatabase) => {
  console.log('fbConfig',fbConfig);
  firebase.initializeApp(fbConfig);
  listenToDatabase();
});



module.exports = app; // this is necessary for some reason