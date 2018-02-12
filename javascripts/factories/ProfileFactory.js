"use strict";

const firebase = require('firebase');

module.exports = function($q, $http, fbConfig){

  
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
  
  const saveProfileWithChanges = (newProfileObj) =>{
    return $q((resolve, reject)=>{
      $http.patch(`${fbConfig.databaseURL}/users/${newProfileObj.uid}.json`, JSON.stringify(newProfileObj))
      .then((response)=>{
        console.log('response after saving profile changes',response);
        resolve(response);
      });
    });
  };

  const checkForConvo = (uid, pid) =>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/convos.json`)
      .then(({data})=>{
        console.log('data',data);
        let keys = Object.keys(data);
        keys.forEach(key => data[key].convoid = key);
        data = Object.values(data);
        resolve(data);
      });
    });
  };

  return{ checkForConvo, getUserProfileData, saveProfileWithChanges };
};


        