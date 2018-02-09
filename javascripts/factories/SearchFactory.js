"use strict";

module.exports = function($q, $http, fbConfig){
  // Ability to search for other users based on profile properties
  // if the filter is a number, filter for values within +/- 3
  const searchByInstrument = (instrument) =>{

    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/users.json?orderBy="instruments"&equalTo="${instrument}"`)
      .then(({data})=>{
        data = Object.values(data);
        resolve(data);
      });
    });
  };

  const searchByInterests = (filter) =>{

    return $q((resolve, reject)=>{
      $http.get(`${fbConfig}/users.json?`)
      .then((users)=>{
        resolve(users);
      });
    });
  };

  const searchByAge = (filter) =>{

    return $q((resolve, reject)=>{
      $http.get(`${fbConfig}/users.json?`)
      .then((users)=>{
        resolve(users);
      });
    });
  };

  const searchByExperience = (filter) =>{

    return $q((resolve, reject)=>{
      $http.get(`${fbConfig}/users.json?`)
      .then((users)=>{
        resolve(users);
      });
    });
  };

  // ability to get those user profiles and display them
  
  
  return { searchByInstrument, searchByInterests, searchByAge, searchByExperience };
};

