"use strict";


// PROFILE PAGE CTRL
module.exports = function
($scope, AuthFactory, SearchFactory, ProfileFactory, $window, 
  $location, $routeParams, ConversationFactory){
  
  AuthFactory.getUser()
  .then(user => {
    // declare scope variables for user properties here
    $scope.uid = user.uid;
    if($scope.uid === $routeParams.pid){
      $scope.myProfile = true;
    }else{$scope.myProfile = false;}
    $scope.getUserProfileDataCTRLR();
  }).catch(err => {
    console.log('error',err);
    $location.path("/registerLogin");
  });

  $scope.getUserProfileDataCTRLR = () =>{
    ProfileFactory.getUserProfileData($routeParams.pid)
    .then((user)=>{
      console.log('user in profileData',user);
      $scope.picToDisplay = user.profilePicture;
      $scope.newProfileObj = {
        name : user.name,
        age : +user.age,
        uid : user.uid,
        instruments : user.instruments,
        interests : user.interests,
        experience : +user.experience,
        convos: user.convos,
        profilePicture: user.profilePicture
      };
    });
  };

  $scope.saveProfile = (newProfileObj) =>{
    ProfileFactory.saveProfileWithChanges(newProfileObj)
    .then(({data})=>{
      console.log('data after its sent, back in ctlr',data);
      $scope.editing = false;
      $scope.getUserProfileDataCTRLR(data.uid);
    });
  };

  //TODO: make "interests" section a list of checkboxes in 'edit' mode

  // TODO: replace sendMessage/editProfile button based on whether it is YOUR profile or someone elses


  // TODO: clicking sendMessage button redirects to either a NEW conversation with the user,
  // OR it goes to an existsing conversation
  // This logic will be tricky

  // TODO: some sort of image uploader to save profile images to firebase?
  // otherwise, images must link from a url

  // TODO: A NEW conversation will add THAT conversation id to the RECEIVING users profile
  // even if they have not responded yet. That way, they will be involved in the conversation,
  // even if they havent added a message to the conversation

  $scope.makeNewConvo = ()=>{
    // createNewConvoObject
    // addConvoToUserObjects
    let newConvoObj = {
      user1: $scope.uid
    };
    ProfileFactory.createNewConvoObject()
    .then((data)=>{
      console.log('after creating new convo object and sending it',data);
      // after adding convoId to user object
    });
  };


  $scope.beginConvo = () =>{
    ConversationFactory.getUserConvoIds($scope.uid)
    .then((arrayOfConvoIds)=>{
      arrayOfConvoIds.forEach(convoId =>{
        ConversationFactory.checkForConvoBetweenTheseTwoUsers(convoId)
        .then((convo)=>{
          convo.convoId = convoId;
          if(convo.user1 === $routeParams.pid || convo.user2 === $routeParams.pid){
            console.log('YUP there is a convo between these 2 users:',convo.messages);
            $location.path(`/conversation/${convo.convoId}`);
          }else{
            console.log('these users have not messaged yet, my dude');
            // this else will only be true if these 2 users have never messaged before. 
            // if they have never messaged, then this will create a new convo object, 
            // add it to the conversation folder in the database, AND add the new conversation ID to 
            // both users conversation list array
            // createNewConvoObject
            // addConvoToUserObjects
          }
        });
      });
    });
  };

  // TODO: 
  // // ngclick on the message button on profile will call a function:
  // that function will first check if there is a convo between 
  // those 2 users by grabbing the current uid of the logged-in user
   // and the routeparams uid of the profile being viewed. if that 
   // convo does not already exist, it will create it, place that convo id
   // into both of those users profiles, THEN redirect to the convo page
   // which will be #!/convo/:cid
   // then the convo ctrllr can use routeparams to grab that cid and 
   // get the messages for it
   // sending the convo id as a parameter, then the Convo ctrllr 
   // will take that convo id and call a factory function to GET the messages
    // contained in that convo
};