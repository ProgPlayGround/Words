'use strict';

describe('loading dirrective', function() {
  var scope, controller, firstElement, secondElement, interval;

  beforeEach(module('words'));

  beforeEach(inject(['$compile', '$rootScope', '$interval',
  function($compile, $rootScope, $interval) {
    var element = angular.element('<loading model="true"></loading>');
    var directive = $compile(element)($rootScope.$new());
    controller = directive.controller('loading');
    scope = directive.isolateScope();

    firstElement = angular.element('<div></div>');
    secondElement = angular.element('<div></div>');
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
});
