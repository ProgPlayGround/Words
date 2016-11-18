'use strict';

describe('letter directive', function() {
  var scope, element, focusCtrl;

  beforeEach(module('words', {focus:{}}));

  beforeEach(inject(['$rootScope', '$compile', function($rootScope, $compile){
    scope = $rootScope.$new();
    element = angular.element('<div letter ng-model="model" char="" on-model-change=""></div>');
    focusCtrl = {
      register: function() {},
      previous: function() {},
      next: function() {}
    }
    element.data('$focusController', focusCtrl);
    spyOn(focusCtrl, 'register');
    spyOn(focusCtrl, 'next');
    spyOn(focusCtrl, 'previous');
    $compile(element)(scope);
    spyOn(element.isolateScope(), 'onModelChange');
    scope.$digest();
  }]));

  it('register element in focus controller', function() {
    expect(focusCtrl.register).toHaveBeenCalledTimes(1);
  });

  it('dont call focus controller for undefined model', function() {
    expect(focusCtrl.next).toHaveBeenCalledTimes(0);
    expect(focusCtrl.previous).toHaveBeenCalledTimes(0);
    expect(element.isolateScope().onModelChange).toHaveBeenCalledTimes(0);
  });

  it('call previous and remove answer classes for empty model', function() {
    scope.model = '';
    scope.$digest();
    expect(focusCtrl.next).toHaveBeenCalledTimes(0);
    expect(focusCtrl.previous).toHaveBeenCalledTimes(1);
    expect(element.hasClass('wrong_answer')).toBeFalsy();
    expect(element.hasClass('correct_answer')).toBeFalsy();
    expect(element.isolateScope().onModelChange).toHaveBeenCalledTimes(1);
  });

  it('call next and add "correct" class when answer is correct', function() {
    scope.model = 'a';
    element.isolateScope().char = 'a';
    scope.$digest();
    expect(focusCtrl.next).toHaveBeenCalledTimes(1);
    expect(focusCtrl.previous).toHaveBeenCalledTimes(0);
    expect(element.hasClass('wrong_answer')).toBeFalsy();
    expect(element.hasClass('correct_answer')).toBeTruthy();
    expect(element.isolateScope().onModelChange).toHaveBeenCalledTimes(1);
  });

  it('call previous and add "wrong" class when answer is incorrect', function() {
    scope.model = 'a';
    element.isolateScope().char = 'b';
    scope.$digest();
    expect(focusCtrl.next).toHaveBeenCalledTimes(1);
    expect(focusCtrl.previous).toHaveBeenCalledTimes(0);
    expect(element.hasClass('wrong_answer')).toBeTruthy();
    expect(element.hasClass('correct_answer')).toBeFalsy();
    expect(element.isolateScope().onModelChange).toHaveBeenCalledTimes(1);
  });
});
