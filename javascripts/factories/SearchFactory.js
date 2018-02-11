"use strict";
const angular = require('angular'); 

module.exports = function($q, $http, fbConfig){
  // Ability to search for other users based on profile properties
  // TODO: if the filter is a number, filter for values within +/- 3
  const searchByInstrument = (instrument) =>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/users.json?orderBy="instruments"&equalTo="${instrument}"`)
      .then(({data})=>{
        data = Object.values(data);
        resolve(data);
      });
    });
  };

  const searchByInterest = (interest) =>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/users.json?orderBy="interests"&equalTo="${interest}"`)
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
        angular.toJson(data);
        resolve(data);
      });
    });
  };

  const searchByExperience = (experience) =>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig.databaseURL}/users.json?orderBy="experience"&equalTo="${experience}"`)
      .then(({data})=>{
        data = Object.values(data);
        resolve(data);
      });
    });
  };

  // ability to get those user profiles and display them
  
  
  return { searchByInstrument, searchByInterest, searchByAge, searchByExperience };
};

