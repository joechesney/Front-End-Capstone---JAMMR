"use strict";

module.exports = function($q, $http, fbConfig){
  // Ability to search for other users based on profile properties
  // if the filter is a number, filter for values within +/- 3
  const searchByFilter = (filter) =>{
    return $q((resolve, reject)=>{
      $http.get(`${fbConfig}/users.json?`)
      .then((users)=>{

      });
    });
  };

  // ability to get those user profiles and display them
  
  
  return {};
};

