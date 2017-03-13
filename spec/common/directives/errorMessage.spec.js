'use strict';

describe('error message directive', function() {
  var scope, form, model;

  beforeEach(function() {
    module('words');
    inject(['$rootScope', '$compile', function($rootScope, $compile){
      scope = $rootScope.$new();
      scope.model = '';
      scope.message = '';
      $compile('<form name="form"><input name="input" error-message message="message" ng-model="model"/></form>')(scope);
      form = scope.form;
      scope.$apply();
    }]);
  });

  it('do nothing for empty message', function() {
    expect(form.input.$error).toEqual({});
  });

  it('adds error to ng-model when message is not empty', function() {
    scope.message = 'Error message';
    scope.$apply();
    expect(form.input.$error).toEqual({error: true});
  });

  it('remove error from ng-model on input', function() {
    scope.message = 'Error message';
    scope.$apply();
    scope.model = '5';
    scope.$apply();
    expect(form.input.$error).toEqual({});
  });
});
