"use strict";

const firebase = require('firebase');

module.exports = function($q, $http){
  // Register New User
    // uid, profile information
  const registerNewUser = (account)=>{
    console.log('account in fcatory',account);
    return $q((resolve, reject)=>{
      firebase.auth().createUserWithEmailAndPassword(account.email,account.password)
      .then((data)=>{
        console.log('data after register in facotry',data);
        resolve(data);
      });
    });
  };

  // Login users using uid
  const loginWithEmailPassword = (account) =>{
    return $q((resolve, reject)=>{
      firebase.auth().signInWithEmailAndPassword(account.email, account.password)
      .then((data)=>{
        console.log('data in factory affter lgoin',data);
        resolve(data);
      });
    });
  };
  
  // authorization to check if a user is logged in

  // checks the uid of the user, and matches it to any convos/ profiles
  return {registerNewUser, loginWithEmailPassword};
};