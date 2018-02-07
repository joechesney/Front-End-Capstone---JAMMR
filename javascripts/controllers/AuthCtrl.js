"use strict";


// AUTH CTRL
module.exports = function($scope, AuthFactory){

  $scope.registerCTRL = () => {
    console.log('fired register ctlr');
    AuthFactory.registerNewUser($scope.account)
    .then((data)=>{
      console.log('data in ctrler ',data);
    });
  };
  // const login = (account)=>{
  //   // call authfactory function
  //   AuthFactory.login(account)
  //   .then(({data})=>{
  //     console.log('data',data);
  //   });
  // };

  // register new user
  
  // login user

  // checks auth of user

  // retrieves uid of user, to test against convo id and profile id


};