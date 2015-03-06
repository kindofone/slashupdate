'use strict';

/**
 * @ngdoc function
 * @name slashupdateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slashupdateApp
 */
angular.module('slashupdateApp')
  .controller('MainCtrl', function ($scope, $rootScope, $firebase, fbutil, $firebaseAuth, Auth) {
    $scope.createUser = function(email, password) {
      Auth.$createUser({
        email    : "yogev.ahuvia@gmail.com",
        password : "1234"
      }).then(function(userData) {
        console.log("Successfully created user account with uid:", userData.uid);
        $scope.login();
      }).catch(function(error) {
        console.log("Error creating user:", error);
      });
    };

    $scope.login = function() {
      Auth.$authWithOAuthPopup("twitter")
        .then(function(authData) {
          console.log("Authenticated successfully with payload:", authData);
        }).catch(function(error) {
          console.log("Login Failed!", error);
        });
    };


    //ref.onAuth(function(authData) {
    //  if (!authData) {
    //    return;
    //  } else {
    //    console.log(authData);
    //  }

    $rootScope.$watch('currentUser', function(newValue, oldValue) {
      if (!$rootScope.currentUser) {
        return;
      }

      var ref = new Firebase("https://slashupdate.firebaseio.com/");
      var sync = $firebase(ref.child('raw')
        .orderByChild('msg__email')
        .equalTo($rootScope.currentUser.inboundAddress));
      $scope.raw = sync.$asArray();
    });
    //});
  });
