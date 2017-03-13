'use strict';

describe('item directive', function() {
  var loadingCtrl;

  beforeEach(function() {
    module('words');
    inject(['$compile', '$rootScope', function($compile, $rootScope) {
      var element = angular.element('<div item></div>');
      loadingCtrl = jasmine.createSpyObj('$loadingController', ['register']);
      element.data('$loadingController', loadingCtrl);
      $compile(element)($rootScope.$new());
    }]);
  });

  it('register element in loading controller', function() {
    expect(loadingCtrl.register).toHaveBeenCalled();
  });
});
