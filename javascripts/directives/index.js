"use strict";

const app = require('angular').module("JAMMRApp");

// ALL DIRECTIVES MUST BE REQUIRED HERE

app.directive('navbar', [require('./NavBarDirective')]);
