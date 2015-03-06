'use strict';

/**
 * @ngdoc function
 * @name slashupdateApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the slashupdateApp
 */
angular.module('slashupdateApp')
  .controller('CategoriesCtrl', function ($scope, fbutil, $timeout) {
    $scope.categories = fbutil.syncArray('categories');
    $scope.categories.$loaded().catch(alert);
    //console.log($scope.categories);

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
