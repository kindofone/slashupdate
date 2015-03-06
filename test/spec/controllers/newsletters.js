'use strict';

describe('Controller: NewslettersCtrl', function () {

  // load the controller's module
  beforeEach(module('slashupdateApp'));

  var NewslettersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewslettersCtrl = $controller('NewslettersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
