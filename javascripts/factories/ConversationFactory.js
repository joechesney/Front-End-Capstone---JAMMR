"use strict";


module.exports = function($q, $http, fbConfig){
    
  const getUserConvoIds = (uid) =>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/users/${uid}/convos.json`)
      .then(({data})=>{
        console.log('data in getUserConvoIds',data);
        
        resolve(data);
      });
    });
  };

  const checkForConvo = (convoId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/convos/${convoId}.json`)
      .then(({data})=>{
        console.log('data in checkForConvo',data);
        
        resolve(data);
      });
    });
  };

  

  

  return { getUserConvoIds, checkForConvo };
};