"use strict";

const app = require('angular').module("JAMMRApp");

// Add controls below
// ALL CONTROLLERS MUST BE REQUIRED HERE
app.controller('HomePageCtrl', require('./HomePageCtrl'));
app.controller('AuthCtrl', require('./AuthCtrl'));
app.controller('ConversationCtrl', require('./ConversationCtrl'));
app.controller('MessagesCtrl', require('./MessagesCtrl'));
app.controller('ProfilePageCtrl', require('./ProfilePageCtrl'));
app.controller('SearchCtrl', require('./SearchCtrl'));
app.controller('NavBarCtrl', require('./NavBarCtrl'));


