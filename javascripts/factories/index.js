'use strict';
const app = require('angular').module("JAMMRApp");

// Add factories below
// ALL FACTORIES MUST BE REQUIRED HERE
app.factory('AuthFactory', require('./AuthFactory'));
app.factory('SearchFactory', require('./SearchFactory'));
app.factory('MessageFactory', require('./MessageFactory'));
app.factory('ProfileFactory', require('./ProfileFactory'));

 
