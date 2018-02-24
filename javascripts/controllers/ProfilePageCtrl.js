"use strict";


// PROFILE PAGE CTRL
module.exports = function
($scope, AuthFactory, SearchFactory, ProfileFactory, $window, 
  $location, $routeParams, ConversationFactory, $q, MessageFactory){
  
  $scope.currentProfileUid = $routeParams.pid;

  AuthFactory.authUser()
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
        zipCode: +user.zipCode,
        uid : user.uid,
        experience : +user.experience,
        profilePicture: user.profilePicture,
        hasPracticeSpace: user.hasPracticeSpace,

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
    if(newProfileObj.zipCode){
      ProfileFactory.getCoordinatesFromZip(newProfileObj.zipCode)
      .then((zipData)=>{
        console.log('data from converting zip mug:: ',zipData.results[0].geometry);
        let zipLocation = zipData.results[0].geometry.location;
        newProfileObj.latitude = zipLocation.lat;
        newProfileObj.longitude = zipLocation.lng;
        ProfileFactory.saveProfileWithChanges(newProfileObj)
          .then(({data})=>{
            $scope.editing = false;
            $scope.getUserProfileDataCTRLR(data.uid);
          });
      });
    }else{
      ProfileFactory.saveProfileWithChanges(newProfileObj)
      .then(({data})=>{
        $scope.editing = false;
        $scope.getUserProfileDataCTRLR(data.uid);
      });
    }
  };

      
  $scope.makeNewConvo = ()=>{
    let newConvoObj = {
      user1: $scope.uid,
      user2: $routeParams.pid
    };
    ProfileFactory.createNewConvoObject(newConvoObj)
    .then((newConvo)=>{
      $location.path(`/conversation/${newConvo.name}`);      
    });
  };
  


  $scope.beginConvo = () =>{

    let getConvosPromiseArray = [MessageFactory.getConvosByUser1($scope.uid),MessageFactory.getConvosByUser2($scope.uid)];
    $q.all(getConvosPromiseArray)
    .then((convosASHELLL)=>{
        let convos1 = Object.values(convosASHELLL[0]);
        let convos2 = Object.values(convosASHELLL[1]);
        let arrayOfAllConvoObjects = _.concat(convos1, convos2);
        let convoExists = false;

        if(arrayOfAllConvoObjects.length === 0 || arrayOfAllConvoObjects.length === -1){
          $scope.makeNewConvo(); 
        }else{
          let convoExists = false;
          for(let i = 0; i < arrayOfAllConvoObjects.length; i++){
            let convoObj = arrayOfAllConvoObjects[i];
            if((convoObj.user1 === $routeParams.pid || convoObj.user2 === $routeParams.pid)&& convoExists === false){
              convoExists = true;
              $location.path(`/conversation/${convoObj.convoId}`);
            }else if( (i === (arrayOfAllConvoObjects.length -1)) && convoExists === false){
              $scope.makeNewConvo(); 
              convoExists = true;
            }
          }
        } // end of else
    });//end of .then
  };

};