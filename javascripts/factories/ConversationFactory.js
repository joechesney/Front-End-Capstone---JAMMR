"use strict";


module.exports = function($q, $http, fbConfig){
    
  const getUserConvoIds = (uid) =>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/users/${uid}/convos.json`)
      .then(({data})=>{        
        resolve(data);
      });
    });
  };

  const getConvoObject = (convoId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/convos/${convoId}.json`)
      .then(({data})=>{        
        resolve(data);
      });
    });
  };

  const getAllConvoMessages = (convoId)=>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/convos/${convoId}.json`)
      .then(({data})=>{
        resolve(data);
      });
    });
  };

  const saveNewMessage = (newMessage, convoId)=>{
    return $q((resolve, reject)=>{
      $http.post(`${fbConfig.databaseURL}/convos/${convoId}/messages.json`, 
      JSON.stringify(newMessage))
      .then(({data})=>{
        resolve(data);
      });
    });
  };

  const deleteMessageFromFireBaseForever = (messageID, convoId)=>{
    return $q((resolve, reject)=>{
      $http.delete(`${fbConfig.databaseURL}/convos/${convoId}/messages/${messageID}.json`)
      .then(({data})=>{
        resolve(data);
      });
    });
  };



  return { 
    getUserConvoIds, 
    getConvoObject, 
    saveNewMessage,
    deleteMessageFromFireBaseForever
  };
};