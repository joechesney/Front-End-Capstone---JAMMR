"use strict";

const firebase = require('firebase');

module.exports = function($q, $http, fbConfig){

  
  const getUserProfileData = uid =>{
    return $q ((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/users/${uid}.json`)
      .then(({data}) =>{
        resolve(data);
      });
    });
  };
  
  const saveProfileWithChanges = (newProfileObj) =>{
    return $q((resolve, reject)=>{
      $http.patch(`${fbConfig.databaseURL}/users/${newProfileObj.uid}.json`, JSON.stringify(newProfileObj))
      .then((response)=>{
        console.log('response after saving profile changes',response);
        resolve(response);
      });
    });
  };

  

  return{ getUserProfileData, saveProfileWithChanges };
};


        