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

  const getConvosByUser1 = (uid)=>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/convos.json?orderBy="user1"&equalTo="${uid}"`)
      .then(({data})=>{
        // data.convoId = convoId;
        // console.log('convo',data);
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
        // data.convoId = convoId;
        // console.log('convo',data);
        let keys = Object.keys(data);
        keys.forEach(key => data[key].convoId = key);
        resolve(data);
      });
    });
  };


  return { getConvoInfo, getConvosByUser1, getConvosByUser2 };
};