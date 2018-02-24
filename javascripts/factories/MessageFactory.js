"use strict";


module.exports = function($q, $http, fbConfig){
    

  const getConvosByUser1 = (uid)=>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/convos.json?orderBy="user1"&equalTo="${uid}"`)
      .then(({data})=>{
        let keys = Object.keys(data);
        keys.forEach(key => data[key].convoId = key);
        resolve(data);
      });
    });
  };
  const getConvosByUser2 = (uid)=>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/convos.json?orderBy="user2"&equalTo="${uid}"`)
      .then(({data})=>{
        let keys = Object.keys(data);
        keys.forEach(key => data[key].convoId = key);
        resolve(data);
      });
    });
  };


  return { getConvosByUser1, getConvosByUser2 };
};