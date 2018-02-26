"use strict";

const firebase = require('firebase');

module.exports = function($q, $http, fbConfig){
 
  const registerNewUser = (account)=>{
    return $q((resolve, reject)=>{
      firebase.auth()
      .createUserWithEmailAndPassword(account.email,account.password)
      .then((data)=>{
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
        resolve(data);
      }).catch((error)=>reject(error));
    });
  };
  
  const postUserProfile = user => {
    return $q((resolve, reject) => {
      $http.patch(`${fbConfig.databaseURL}/users/${user.uid}.json`,
      JSON.stringify({"uid": user.uid}))
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  };

  // TODO: change the name of this function to 'AuthUser' to be more clear
  // authorization to check if a user is logged in
  const authUser = () => {
    return $q((resolve, reject) => {
      firebase.auth()
      .onAuthStateChanged(user => {
        if (user) {resolve(user);} else {reject("No user");}
      });
    });
  };

  const getUserInfo = (uid)=>{
    return $q((resolve, reject) => {
      $http.get(`${fbConfig.databaseURL}/users/${uid}.json`)
        .then(({data}) => resolve(data))
        .catch(err => reject(err));
    });
  };
  
  const getAllUsers = ()=>{
    return $q((resolve, reject) => {
      $http.get(`${fbConfig.databaseURL}/users.json`)
        .then(({data}) => resolve(data))
        .catch(err => reject(err));
    });
  };

  let logout = () => {
    return firebase.auth().signOut();
  };



  // checks the uid of the user, and matches it to any convos/ profiles
  return {
    registerNewUser, 
    loginWithEmailPassword, 
    authUser, 
    logout, 
    postUserProfile, 
    getUserInfo,
    getAllUsers
  };
};