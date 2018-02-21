"use strict";


module.exports = function($q, $http, fbConfig, googleMapsConfig){

  const getCoordinatesFromZip = (zip)=>{
    return $q((resolve, reject)=>{
      $http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip},US&key=${googleMapsConfig.apiKey}`)
      .then(({data})=>{
        console.log('data from getcoordsfromzip:',data);
        resolve(data);
      });
    });
  };
  

  // ${fbConfig.databaseURL}/convos/${convoId}.json
  return {
    getCoordinatesFromZip
  };
};