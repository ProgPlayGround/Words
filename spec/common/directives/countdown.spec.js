'use strict';

describe('countdown directive', function() {
  var directive, interval, scope;

  beforeEach(function() {
    module('words');

    inject(['$rootScope', '$interval', '$compile', function($rootScope, $interval, $compile) {
      var element = angular.element('<countdown count="50" callback=""></countdown>');
      directive = $compile(element)($rootScope.$new());

      scope = directive.isolateScope();
      interval = $interval;

      scope.$digest();
    }]);
  });

  it('init with specified count and callback', function() {
    expect(scope.count).toBe(50);
    expect(scope.callback).toBeDefined();
  });

  it('decrease count on countdown', function() {
    interval.flush(1000);
    expect(scope.count).toBe(49);
  });

  it('clear interval on releasing countdown', function() {
    spyOn(interval, 'cancel');
    spyOn(directive.isolateScope(), 'callback');
    interval.flush(51000);
    expect(scope.count).toBe(0);
    expect(interval.cancel).toHaveBeenCalled();
    expect(directive.isolateScope().callback).toHaveBeenCalled();
  });
});
