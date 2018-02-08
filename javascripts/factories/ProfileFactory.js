"use strict";

const firebase = require('firebase');

module.exports = function($q, $http, fbConfig){

  const editProfile = user =>{
    // this will patch any profile changes to the users profile
  };
  const getUserProfileData = uid =>{
    console.log('uid in factory',uid);
    return $q ((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/users/${uid}.json`)
      .then(({data}) =>{
        console.log('data in profile factory',data);
        // "userName": user.userName,
        resolve(data);
      });
    });
  };
  

  return{ editProfile, getUserProfileData };
};


        // "userName": user.userName,
        // "instruments": user.instruments,
        // "insterests": user.interests,
        // "conversations": []