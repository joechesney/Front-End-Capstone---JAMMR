"use strict";

const angular = require('angular'); // it knows where it is, from node modules
// Other dependencies below

const app = angular.module('testApp', ["ngRoute"]); // name of app


require('./factories');
require('./controllers');


// Put routes here


module.exports = app;