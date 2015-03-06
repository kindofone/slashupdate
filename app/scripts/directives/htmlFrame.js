'use strict';

/**
 * @ngdoc directive
 * @name slashupdateApp.directive:htmlFrame
 * @description
 * # htmlFrame
 */
angular.module('slashupdateApp')
  .directive('htmlFrame', function ($compile, $sce, base64) {
    return {
      restrict: 'E',
      scope: {
        src: '=src'
      },
      link: function postLink(scope, element, attrs) {
        //var datauri = $sce.trustAsHtml("data:text/html;base64," + base64.encode(scope.src));
        var $iframe = $('<iframe style="width: 100%; opacity: 0;" class="paper-frame" src=""></div>');
        var blob = new Blob([scope.src], { type: "text/html" });
        $iframe.attr("src", URL.createObjectURL(blob));
        //var e = $compile(html)(scope);
        $iframe.load(function() {
          this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
          this.style.opacity = 1;
        });
        element.replaceWith($iframe);
      }
    };
  });