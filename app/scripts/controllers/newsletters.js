'use strict';

/**
 * @ngdoc function
 * @name slashupdateApp.controller:NewslettersCtrl
 * @description
 * # NewslettersCtrl
 * Controller of the slashupdateApp
 */
angular.module('slashupdateApp')
  .controller('NewslettersCtrl', function ($scope, fbutil, $timeout) {
    $scope.newsletters = fbutil.syncArray('newsletters/Yogev Ahuvia', {limit: 10});
    $scope.newsletters.$loaded().catch(alert);
    console.log($scope.newsletters);

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
