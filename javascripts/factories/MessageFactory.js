"use strict";


module.exports = function($q, $http, fbConfig){
    
  
  const getConvoInfo = (convoId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/convos/${convoId}.json`)
      .then(({data})=>{
        data.convoId = convoId;
        resolve(data);
      });
    });
  };

  return { getConvoInfo };
};