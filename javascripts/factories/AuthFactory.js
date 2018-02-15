"use strict";

const firebase = require('firebase');

module.exports = function($q, $http, fbConfig){
 
  const registerNewUser = (account)=>{
    return $q((resolve, reject)=>{
      firebase.auth()
      .createUserWithEmailAndPassword(account.email,account.password)
      .then((data)=>{
        console.log('succesfsul register in facotry',data);
        resolve(data);
      }).catch((error)=>reject(error));
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
      }).catch((error)=>reject(error));
    });
  };
  
  const postUserProfile = user => {
    return $q((resolve, reject) => {
      $http.patch(`${fbConfig.databaseURL}/users/${user.uid}.json`,
      JSON.stringify({"uid": user.uid, "convos": [""]}))
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  };

  // TODO: change the name of this function to 'AuthUser' to be more clear
  // authorization to check if a user is logged in
  const getUser = () => {
    return $q((resolve, reject) => {
      firebase.auth()
      .onAuthStateChanged(user => {
        if (user) {resolve(user);} else {reject("No user");}
      });
    });
  };

  // TODO: change this function name to 'GetUserInfo' to be more clear
  const getUserName = (uid)=>{
    return $q((resolve, reject) => {
      $http.get(`${fbConfig.databaseURL}/users/${uid}.json`)
        .then(({data}) => resolve(data))
        .catch(err => reject(err));
    });
  };
  

  let logout = () => {
    return firebase.auth().signOut();
  };



  // checks the uid of the user, and matches it to any convos/ profiles
  return {registerNewUser, loginWithEmailPassword, getUser, logout, postUserProfile, getUserName};
};