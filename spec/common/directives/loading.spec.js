'use strict';

describe('loading dirrective', function() {
  var scope, controller, firstElement, interval;

  beforeEach(module('words'));

  beforeEach(inject(['$compile', '$rootScope', '$interval',
  function($compile, $rootScope, $interval) {
    var element = angular.element('<loading model="true"></loading>');
    var directive = $compile(element)($rootScope.$new());
    controller = directive.controller('loading');
    scope = directive.isolateScope();

    firstElement = angular.element('<div></div>');
    interval = $interval;
  }]));

  it('has empty elements array on creation', function() {
    expect(scope.elements).toBeDefined();
    expect(scope.elements.length).toEqual(0);
  });

  it('register add element to elements array', function() {
    controller.register(firstElement);
    expect(scope.elements.length).toEqual(1);
  });

  it('trigger animation in 500 millis interval', function() {
    spyOn(scope, 'animate');
    expect(scope.animate).not.toHaveBeenCalled();
    interval.flush(500);
    expect(scope.animate).toHaveBeenCalledTimes(1);
  });

  it('animation add swing class to element', function() {
    controller.register(firstElement);
    expect(firstElement.hasClass('swing')).toBeFalsy();
    interval.flush(500);
    expect(firstElement.hasClass('swing')).toBeTruthy();
  });

  it('animation removes swing class from all elements after full cicle', function() {
    controller.register(firstElement);
    interval.flush(500);
    expect(firstElement.hasClass('swing')).toBeTruthy();
    interval.flush(500);
    expect(firstElement.hasClass('swing')).toBeFalsy();
  });

  it('cancel animation on model set to false', function() {
    interval.flush(500);
    expect(scope.animation).toBeDefined();
    scope.model = false;
    scope.$digest();
    expect(scope.animation).not.toBeDefined();
  });
});
