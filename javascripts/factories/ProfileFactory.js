"use strict";

const firebase = require('firebase');

module.exports = function($q, $http, fbConfig, googleMapsConfig){

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
      $http.patch(`${fbConfig.databaseURL}/users/${newProfileObj.uid}.json`, 
      JSON.stringify(newProfileObj))
      .then((response)=>{
        // console.log('response after saving profile changes',response);
        resolve(response);
      });
    });
  };

  const createNewConvoObject = (convoObj)=>{
    return $q((resolve, reject)=>{
      $http.post(`${fbConfig.databaseURL}/convos.json`, 
      JSON.stringify(convoObj))
      .then(({data})=>{
        resolve(data);
      });
    });
  };

  const getCoordinatesFromZip = (zip)=>{
    return $q((resolve, reject)=>{
      $http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip},US&key=${googleMapsConfig.apiKey}`)
      .then(({data})=>{
        resolve(data);
      });
    });
  };

  return{ 
    getUserProfileData, 
    saveProfileWithChanges, 
    createNewConvoObject,
    getCoordinatesFromZip
   };
};


        