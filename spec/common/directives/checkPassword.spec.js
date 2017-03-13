'use strict';

describe('check password directive', function() {
  var scope, element, model;

  beforeEach(function() {
    module('words');
    inject(['$rootScope', '$compile', function($rootScope, $compile){
      scope = $rootScope.$new();
      scope.model = '';
      element = $compile('<input check-password ng-model="model"/>')(scope);
      scope.$apply();
    }]);
  });

  it('validate ASCII input', function() {
    element.val('abcdefghijklmnop').triggerHandler('input');
    scope.$apply();
    expect(scope.model).toEqual('abcdefghijklmnop');
  });

  it('fail to validate unicode input', function() {
    element.val('абвгдежзклмнопрст').triggerHandler('input');
    scope.$apply();
    expect(scope.model).not.toBeDefined();
  });
});
