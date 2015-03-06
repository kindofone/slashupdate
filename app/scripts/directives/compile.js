'use strict';

/**
 * @ngdoc directive
 * @name slashupdateApp.directive:compile
 * @description
 * # compile
 */
angular.module('slashupdateApp')
  .directive('compile', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the compile directive');
      }
    };
  });