"use strict";


// PROFILE PAGE CTRL
module.exports = function
($scope, AuthFactory, SearchFactory, ProfileFactory, $window, 
  $location, $routeParams, ConversationFactory){
  
  AuthFactory.getUser()
  .then(user => {
    $scope.uid = user.uid;
    if($scope.uid === $routeParams.pid){$scope.myProfile = true;}else{$scope.myProfile = false;}
    $scope.getUserProfileDataCTRLR();
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });

  $scope.getUserProfileDataCTRLR = () =>{
    ProfileFactory.getUserProfileData($routeParams.pid)
    .then((user)=>{
      $scope.picToDisplay = user.profilePicture;
      $scope.newProfileObj = {
        name : user.name,
        age : +user.age,
        uid : user.uid,
        experience : +user.experience,
        profilePicture: user.profilePicture,
        convos: user.convos,


        guitar: user.guitar,
        bass: user.bass,
        drums: user.drums,
        vocals: user.vocals,
        keyboard: user.keyboard,
        violin: user.violin,
        saxophone: user.saxophone,
        trumpet: user.trumpet,
        trombone: user.trombone,


        professionalBand: user.professionalBand,
        hobbyBand: user.hobbyBand,
        jam: user.jam,
        chat: user.chat,
        learn: user.learn,
        session: user.session,

        otherInstruments : user.otherInstruments,
        otherInterests : user.otherInterests
      };
    });
  };

  $scope.saveProfile = (newProfileObj) =>{
    console.log('instruments: ',$scope.instruments);
    ProfileFactory.saveProfileWithChanges(newProfileObj)
    .then(({data})=>{
      console.log('data after its sent, back in ctlr',data);
      $scope.editing = false;
      $scope.getUserProfileDataCTRLR(data.uid);
    });
  };

  //TODO: make "interests" section a list of checkboxes in 'edit' mode

  // TODO: some sort of image uploader to save profile images to firebase?
  // otherwise, images must link from a url

//   // TODO: refactor data structure:

        //remove convoIDs from user objects:
        //   since the convo objects already have the uid as a property,
        //   i can just orderBy user1 and then make a separate call to orderBy user2,
        //   and retrieve the convos that way. This will provide flatter data, and 
        //   reduce the amount of XHRs (i think).
        
        // TODO: 
        //remove userName from convo message object:
        //   use the uid of the user who sent the message to get the name


  $scope.makeNewConvo = ()=>{
    let newConvoObj = {
      user1: $scope.uid,
      user2: $routeParams.pid
    };
    ProfileFactory.createNewConvoObject(newConvoObj)
    .then((data1)=>{
      let brandNewConvoId = data1.name;
      ProfileFactory.addConvoToUserObjects($scope.uid, brandNewConvoId)
      .then((data2)=>{
        ProfileFactory.addConvoToUserObjects($routeParams.pid, brandNewConvoId)
        .then((data3)=>{
          $location.path(`/conversation/${data1.name}`);
        });
      });
    });
  };


$scope.beginConvo = () =>{
  ConversationFactory.getUserConvoIds($scope.uid)
  .then((objectOfConvoIds)=>{
    if(objectOfConvoIds === null){
      $scope.makeNewConvo(); 
    }else{
      let arrayOfConvoIds = Object.values(objectOfConvoIds);
      let convoExists = false;

      /* jshint ignore:start */
      // while (convoExists === false) {
        for(let i = 0; i < arrayOfConvoIds.length; i++){
          let convoId = arrayOfConvoIds[i];
          ConversationFactory.checkForConvoBetweenTheseTwoUsers(convoId)
          .then((convoObj)=>{
            convoObj.convoId = convoId;
            if(convoObj.user1 === $routeParams.pid || convoObj.user2 === $routeParams.pid){
              convoExists = true;
              i = arrayOfConvoIds.length;
              $location.path(`/conversation/${convoObj.convoId}`);
            }else if(i === (arrayOfConvoIds.length - 1)){
              $scope.makeNewConvo(); 
              convoExists = true;
            }
          });
        }
        
      // }
      /* jshint ignore:end */
    } // end of else
  });
};
};