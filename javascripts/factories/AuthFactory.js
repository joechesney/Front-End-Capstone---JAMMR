"use strict";

const firebase = require('firebase');

module.exports = function($q, $http){
 
  const registerNewUser = (account)=>{
    return $q((resolve, reject)=>{
      firebase.auth().createUserWithEmailAndPassword(account.email,account.password)
      .then((data)=>{
        console.log('succesfsul register in facotry',data);
        resolve(data);
      }).catch((error)=>{
        reject(error);
      });
    });
  };

  // Login users using uid
  const loginWithEmailPassword = (account) =>{
    return $q((resolve, reject)=>{
      firebase.auth()
      .signInWithEmailAndPassword(account.email, account.password)
      .then((data)=>{
        console.log('successful login in facotry',data);
        resolve(data);
      }).catch((error)=>{
        reject(error);
      });
    });
  };
  
  // authorization to check if a user is logged in
  const getUser = () => {
    return $q((resolve, reject) => {
      firebase.auth()
      .onAuthStateChanged(user => {
        if (user) {resolve(user);} else {reject("No user");}
      });
    });
  };

  let logout = () => {
    return firebase.auth().signOut();
  };



  // checks the uid of the user, and matches it to any convos/ profiles
  return {registerNewUser, loginWithEmailPassword, getUser, logout};
};