'use strict';

describe('letter directive', function() {
  var scope, element, directive, focusCtrl;

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
    directive = $compile(element)(scope);
    spyOn(element.isolateScope(), 'onModelChange');
    scope.$digest();
  }]));

  it('register element in focus controller', function() {
    expect(focusCtrl.register).toHaveBeenCalledTimes(1);
  });

  it('dont call focus controller for undefined model', function() {
    expect(focusCtrl.next).not.toHaveBeenCalled();
    expect(focusCtrl.previous).not.toHaveBeenCalled();
    expect(element.isolateScope().onModelChange).not.toHaveBeenCalled();
  });

  it('call previous and remove answer classes for empty model', function() {
    scope.model = '';
    scope.$digest();
    expect(focusCtrl.next).not.toHaveBeenCalled();
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
    expect(focusCtrl.previous).not.toHaveBeenCalled();
    expect(element.hasClass('wrong_answer')).toBeFalsy();
    expect(element.hasClass('correct_answer')).toBeTruthy();
    expect(element.isolateScope().onModelChange).toHaveBeenCalledTimes(1);
  });

  it('call previous and add "wrong" class when answer is incorrect', function() {
    scope.model = 'a';
    element.isolateScope().char = 'b';
    scope.$digest();
    expect(focusCtrl.next).toHaveBeenCalledTimes(1);
    expect(focusCtrl.previous).not.toHaveBeenCalled();
    expect(element.hasClass('wrong_answer')).toBeTruthy();
    expect(element.hasClass('correct_answer')).toBeFalsy();
    expect(element.isolateScope().onModelChange).toHaveBeenCalledTimes(1);
  });

  it('call next on keypress when model has not change', function() {
    scope.model = 'a';
    scope.$digest();

    var event = document.createEvent('events');
    event.initEvent('keypress', true, false);
    event.keyCode = 97;

    spyOn(event, 'preventDefault');

    directive.triggerHandler(event);

    expect(focusCtrl.next).toHaveBeenCalledTimes(2);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('do nothing on keypress when model has change', function() {
    scope.model = 'a';
    scope.$digest();

    var event = document.createEvent('events');
    event.initEvent('keypress', true, false);
    event.keyCode = 98;

    spyOn(event, 'preventDefault');

    directive.triggerHandler(event);

    expect(focusCtrl.next).toHaveBeenCalledTimes(1);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('prevent space keyCode', function() {
    var event = document.createEvent('events');
    event.initEvent('keydown', true, false);
    event.keyCode = 32;
    spyOn(event, 'preventDefault');

    directive.triggerHandler(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('call previous on backspace', function() {
    var event = document.createEvent('events');
    event.initEvent('keydown', true, false);
    event.keyCode = 8;
    spyOn(event, 'preventDefault');

    directive.triggerHandler(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(focusCtrl.previous).toHaveBeenCalled();
  });

  it('call previous on delete', function() {
    var event = document.createEvent('events');
    event.initEvent('keydown', true, false);
    event.keyCode = 46;
    spyOn(event, 'preventDefault');

    directive.triggerHandler(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(focusCtrl.previous).toHaveBeenCalled();
  });

  it('ignore cursor changing events', function() {
    var preventCodes = [32, 38, 40];
    for(var keyCode of preventCodes) {
      var event = document.createEvent('events');
      event.initEvent('keydown', true, false);
      event.keyCode = keyCode;
      spyOn(event, 'preventDefault');

      directive.triggerHandler(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(focusCtrl.next).not.toHaveBeenCalled();
      expect(focusCtrl.previous).not.toHaveBeenCalled();
    }
  });

  it('call previous on left key click', function() {
    var event = document.createEvent('events');
    event.initEvent('keydown', true, false);
    event.keyCode = 37;
    spyOn(event, 'preventDefault');

    directive.triggerHandler(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(focusCtrl.next).not.toHaveBeenCalled();
    expect(focusCtrl.previous).toHaveBeenCalled();
  });

  it('call next on right key click', function() {
    var event = document.createEvent('events');
    event.initEvent('keydown', true, false);
    event.keyCode = 39;
    spyOn(event, 'preventDefault');

    directive.triggerHandler(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(focusCtrl.next).toHaveBeenCalled();
    expect(focusCtrl.previous).not.toHaveBeenCalled();
  });
});
