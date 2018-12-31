'use strict';
const app = require('angular').module("JAMMRApp");

// Add factories below
// ALL FACTORIES MUST BE REQUIRED HERE
app.factory('AuthFactory', ['$q', '$http', 'fbConfig', require('./AuthFactory')]);
app.factory('SearchFactory', ['$q', '$http', 'fbConfig', require('./SearchFactory')]);
app.factory('MessageFactory', ['$q', '$http', 'fbConfig', require('./MessageFactory')]);
app.factory('ProfileFactory', ['$q', '$http', 'fbConfig', require('./ProfileFactory')]);
app.factory('ConversationFactory', ['$q', '$http', 'fbConfig', require('./ConversationFactory')]);
