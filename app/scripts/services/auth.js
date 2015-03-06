'use strict';

angular.module('slashupdateApp')
  .factory('Auth', function ($rootScope, $firebase, $firebaseAuth, $http, base64) {
    var ref = new Firebase("https://slashupdate.firebaseio.com/");

    ref.onAuth(function (authData) {
      if (!authData) {
        return;
      }

      console.log(authData);

      // check if user is new
      var userObj = $firebase(ref.child('users/' + authData.uid)).$asObject();
      //var userObj = firebaseRef.child("categories").child("Development").$asObject();
      var userSafeId = base64.urlencode(authData.uid);
      var domain = "inbound.slashupdate.com";

      userObj.$loaded().then(function () {
        $rootScope.currentUser = {
          userObj: userObj,
          userSafeId: userSafeId,
          inboundAddress: userSafeId + "@" + domain
        };

        var isNewUser = ((typeof userObj.$value !== 'undefined') && (userObj.$value == null));
        console.log($rootScope.currentUser, isNewUser);

        if (isNewUser) {
          $http.post('https://mandrillapp.com/api/1.0/inbound/add-route.json', {
            domain: "inbound.slashupdate.com",
            key: "BbnBKorfJNe6VH2JvC7-Sw",
            pattern: userSafeId,
            url: "https://zapier.com/hooks/catch/owibru/"
          }).
            success(function (data, status, headers, config) {
              console.log(data, status, headers, config);
            }).
            error(function (data, status, headers, config) {
              console.log(data, status, headers, config);
            });

          firebaseRef.child("users").child(authData.uid).set({
            provider: authData.provider,
            inbound: $rootScope.currentUser.inboundAddress
          });
        }
      });
    });

    return $firebaseAuth(ref);
  });