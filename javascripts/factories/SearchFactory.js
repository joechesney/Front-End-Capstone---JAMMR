"use strict";
const angular = require('angular'); 

module.exports = function($q, $http, fbConfig){

  const searchByInstrument = (instrument) =>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/users.json?orderBy="${instrument}"&equalTo=true`)
      .then(({data})=>{
        data = Object.values(data);
        resolve(data);
      });
    });
  };

  const searchByInterest = (interest) =>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/users.json?orderBy="${interest}"&equalTo=true`)
      .then(({data})=>{
        data = Object.values(data);
        resolve(data);
      });
    });
  };

  const searchByGenre = (genre) =>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/users.json?orderBy="${genre}"&equalTo=true`)
      .then(({data})=>{
        data = Object.values(data);
        resolve(data);
      });
    });
  };

  const searchByAge = (age) =>{
    let ageHigh = age + 3;
    let ageLow = age - 3;
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/users.json?orderBy="age"&startAt=${ageLow}&endAt=${ageHigh}`)
      .then(({data})=>{
        data = Object.values(data);
        resolve(data);
      });
    });
  };

  const searchByExperience = (experience) =>{
    let expHigh = experience + 3;
    let expLow = experience - 3;
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/users.json?orderBy="experience"&startAt=${expLow}&endAt=${expHigh}`)
      .then(({data})=>{
        data = Object.values(data);
        resolve(data);
      });
    });
  };  
  
  return { 
    searchByInstrument, 
    searchByInterest, 
    searchByAge, 
    searchByExperience,
    searchByGenre
   };
};

