'use strict';

describe('required on condition directive', function() {
  var scope, element, form;

  beforeEach(function() {
    module('words');
    inject(['$rootScope', '$compile', function($rootScope, $compile) {
      scope = $rootScope.$new();
      scope.condition = false;
      scope.model = '';
      element = $compile('<form name="form"><input name="input" required-on-condition="condition" ng-model="model"/></form>')(scope);
      form = scope.form;
      scope.$apply();
    }]);
  });

  it('validate on false condition', function() {
    expect(form.input.$error).toEqual({});
  });

  it('adds required error on true condition and empty model', function() {
    scope.condition = true;
    scope.$apply();
    expect(form.input.$error).toEqual({required: true});
  });

  it('validate on true condition and not empty model', function() {
    scope.condition = true;
    scope.model = '1';
    scope.$apply();
    expect(form.input.$error).toEqual({});
  });
});
