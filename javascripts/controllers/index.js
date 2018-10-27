"use strict";

const app = require('angular').module("JAMMRApp");

// Add controls below
// ALL CONTROLLERS MUST BE REQUIRED HERE
app.controller('HomePageCtrl', ['$scope', 'AuthFactory', '$location', '$window', 'ProfileFactory', require('./HomePageCtrl')]);
app.controller('AuthCtrl', ['$scope', 'AuthFactory', '$location', '$window', '$q', require('./AuthCtrl')]);
app.controller('ConversationCtrl', ['$scope', 'AuthFactory', '$location', 'ConversationFactory', '$routeParams', 'ProfileFactory', require('./ConversationCtrl')]);
app.controller('MessagesCtrl', ['$scope', 'AuthFactory', 'MessageFactory', '$q', require('./MessagesCtrl')]);
app.controller('ProfilePageCtrl', ['$scope', 'AuthFactory', 'ProfileFactory', '$location', '$routeParams', '$q', 'MessageFactory', require('./ProfilePageCtrl')]);
app.controller('SearchCtrl', ['$scope', '$location', 'AuthFactory', 'SearchFactory', '$q', require('./SearchCtrl')]);
app.controller('NavBarCtrl', ['$scope', '$window', '$location', 'AuthFactory', require('./NavBarCtrl')]);
app.controller('MapPageCtrl', ['$scope', 'AuthFactory', '$routeParams', require('./MapPageCtrl')]);

// HomePageCtrl.$inject = ['$scope'];
// AuthCtrl.$inject = ['$scope'];
// ConversationCtrl.$inject = ['$scope'];
// MessagesCtrl.$inject = ['$scope'];
// ProfilePageCtrl.$inject = ['$scope'];
// SearchCtrl.$inject = ['$scope'];
// NavBarCtrl.$inject = ['$scope'];
// HomePageCtrl.$inject = ['$scope'];
