'use strict';

describe('loading dirrective', function() {
  var scope, element, controller, firstElement, interval, requestCounterService;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
      $provide.factory('requestCounter', function() {
        var count = 0;
        return {
          'increase': function() {
            count++;
          },
          'decrease': function() {
            count--;
          },
          'requestCount': function() {
            return count;
          }
        };
    });
    }]);
    inject(['$compile', '$rootScope', '$interval', 'requestCounter',
    function($compile, $rootScope, $interval, requestCounter) {
      requestCounterService = requestCounter;
      requestCounterService.increase();
      element = angular.element('<loading></loading>');
      scope = $rootScope.$new();
      var directive = $compile(element)(scope);
      controller = directive.controller('loading');

      firstElement = angular.element('<div></div>');
      interval = $interval;
    }]);
  });

  it('show animation when loading in process', function() {
    expect(element.hasClass('fadeOut animated')).toBeFalsy();
  });

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

  it('cancel animation on model set to 0', function() {
    spyOn(interval, 'cancel');

    interval.flush(500);
    expect(scope.animation).toBeDefined();

    var animation = scope.animation;
    scope.$apply(function() {
      requestCounterService.decrease();
    });

    expect(interval.cancel).toHaveBeenCalledWith(animation);
    expect(scope.animation).not.toBeDefined();
    expect(element.hasClass('fadeOut animated')).toBeTruthy();
  });
});
