'use strict';

describe('letter directive', function() {
  var scope, event, element, directive, focusCtrl;

  beforeEach(module('words', {focus:{}}));

  beforeEach(inject(['$rootScope', '$compile', function($rootScope, $compile){
    scope = $rootScope.$new();
    element = angular.element('<div letter ng-model="model" char="" on-model-change=""></div>');
    focusCtrl = jasmine.createSpyObj('$focusController', ['register', 'previous', 'next']);
    element.data('$focusController', focusCtrl);

    directive = $compile(element)(scope);
    spyOn(element.isolateScope(), 'onModelChange');

    event = jasmine.createSpyObj('keypressEvent', ['preventDefault']);

    scope.$digest();
  }]));

  it('register element in focus controller', function() {
    expect(focusCtrl.register).toHaveBeenCalledTimes(1);
  });

  it('don\'t call focus controller for undefined model', function() {
    expect(focusCtrl.next).not.toHaveBeenCalled();
    expect(focusCtrl.previous).not.toHaveBeenCalled();
    expect(element.hasClass('letter_wrong_answer')).toBeFalsy();
    expect(element.hasClass('letter_correct_answer')).toBeFalsy();
    expect(element.isolateScope().onModelChange).not.toHaveBeenCalled();
  });

  it('call previous and remove answer classes for empty model', function() {
    scope.model = '';
    scope.$digest();

    expect(focusCtrl.next).not.toHaveBeenCalled();
    expect(focusCtrl.previous).toHaveBeenCalledTimes(1);
    expect(element.hasClass('letter_wrong_answer')).toBeFalsy();
    expect(element.hasClass('letter_correct_answer')).toBeFalsy();
    expect(element.isolateScope().onModelChange).toHaveBeenCalledTimes(1);
  });

  it('call next and add "correct" class when answer is correct', function() {
    scope.model = 'a';
    element.isolateScope().char = 'a';
    scope.$digest();

    expect(focusCtrl.next).toHaveBeenCalledTimes(1);
    expect(focusCtrl.previous).not.toHaveBeenCalled();
    expect(element.hasClass('letter_wrong_answer')).toBeFalsy();
    expect(element.hasClass('letter_correct_answer')).toBeTruthy();
    expect(element.isolateScope().onModelChange).toHaveBeenCalledTimes(1);
  });

  it('call previous and add "wrong" class when answer is incorrect', function() {
    scope.model = 'a';
    element.isolateScope().char = 'b';
    scope.$digest();

    expect(focusCtrl.next).toHaveBeenCalledTimes(1);
    expect(focusCtrl.previous).not.toHaveBeenCalled();
    expect(element.hasClass('letter_wrong_answer')).toBeTruthy();
    expect(element.hasClass('letter_correct_answer')).toBeFalsy();
    expect(element.isolateScope().onModelChange).toHaveBeenCalledTimes(1);
  });

  it('call next on keypress when model has not change', function() {
    scope.model = 'a';
    scope.$digest();

    var event = jasmine.createSpyObj('keypressEvent', ['preventDefault']);
    event.type = 'keypress';
    event.keyCode = 97;

    directive.triggerHandler(event);

    expect(focusCtrl.next).toHaveBeenCalledTimes(2);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('do nothing on keypress when model has change', function() {
    scope.model = 'a';
    scope.$digest();

    event.type = 'keypress';
    event.keyCode = 98;

    directive.triggerHandler(event);

    expect(focusCtrl.next).toHaveBeenCalledTimes(1);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('prevent space keyCode', function() {
    event.type = 'keydown';
    event.keyCode = 32;

    directive.triggerHandler(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('call previous on backspace', function() {
    event.type = 'keydown';
    event.keyCode = 8;

    directive.triggerHandler(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(focusCtrl.previous).toHaveBeenCalled();
  });

  it('call previous on delete', function() {
    event.type = 'keydown';
    event.keyCode = 46;

    directive.triggerHandler(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(focusCtrl.previous).toHaveBeenCalled();
  });

  it('ignore cursor changing events', function() {
    var preventCodes = [32, 38, 40];
    _.forEach(preventCodes, function(keyCode) {
      event.type = 'keydown';
      event.keyCode = keyCode;

      directive.triggerHandler(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(focusCtrl.next).not.toHaveBeenCalled();
      expect(focusCtrl.previous).not.toHaveBeenCalled();
    });
  });

  it('call previous on left key click', function() {
    event.type = 'keydown';
    event.keyCode = 37;

    directive.triggerHandler(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(focusCtrl.next).not.toHaveBeenCalled();
    expect(focusCtrl.previous).toHaveBeenCalled();
  });

  it('call next on right key click', function() {
    event.type = 'keydown';
    event.keyCode = 39;

    directive.triggerHandler(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(focusCtrl.next).toHaveBeenCalled();
    expect(focusCtrl.previous).not.toHaveBeenCalled();
  });
});
