'use strict';

describe('focus directive', function() {
  var scope, controller, firstElement, secondElement;

  beforeEach(module('words'));

  beforeEach(inject(['$rootScope', '$compile', function($rootScope, $compile){
    scope = $rootScope.$new();
    var directive = $compile('<focus></focus>')(scope);
    controller = directive.controller('focus');

    firstElement = angular.element('<div></div>');
    secondElement = angular.element('<div></div>');

    firstElement[0].select = function() {};
    secondElement[0].select = function() {};

    _.forEach([firstElement, secondElement], function(elem) {
      spyOn(elem[0], 'blur');
      spyOn(elem[0], 'select');
      spyOn(elem[0], 'focus');
    });
  }]));

  it('has empty elements array on creation', function() {
    expect(scope.elements).toBeDefined();
    expect(scope.elements.length).toEqual(0);
  });

  it('has methods to operate with elements array', function() {
    expect(controller.register).toBeDefined();
    expect(controller.next).toBeDefined();
    expect(controller.previous).toBeDefined();
  });

  it('allows registration of elements to watch', function() {
    controller.register(firstElement);
    expect(scope.elements.length).toEqual(1);
  });

  it('next blur current element, focus and select next', function() {
    controller.register(firstElement[0]);
    controller.register(secondElement[0]);

    controller.next(0);
    expect(firstElement[0].blur).toHaveBeenCalled();
    expect(secondElement[0].select).toHaveBeenCalled();
    expect(secondElement[0].focus).toHaveBeenCalled();
  });

  it('next only select last element', function() {
    controller.register(firstElement[0]);
    controller.register(secondElement[0]);

    controller.next(1);
    expect(firstElement[0].blur).not.toHaveBeenCalled();
    expect(secondElement[0].select).toHaveBeenCalled();
    expect(secondElement[0].focus).not.toHaveBeenCalled();
  });

  it('next do not process out of bound indexes', function() {
    controller.register(firstElement[0]);
    controller.register(secondElement[0]);

    controller.next(-1);
    expect(firstElement[0].blur).not.toHaveBeenCalled();
    expect(secondElement[0].select).not.toHaveBeenCalled();
    expect(secondElement[0].focus).not.toHaveBeenCalled();

    controller.next(2);
    expect(firstElement[0].blur).not.toHaveBeenCalled();
    expect(secondElement[0].select).not.toHaveBeenCalled();
    expect(secondElement[0].focus).not.toHaveBeenCalled();
  });

  it('previous blur current element, focus and select next', function() {
    controller.register(firstElement[0]);
    controller.register(secondElement[0]);

    controller.previous(1);
    expect(secondElement[0].blur).toHaveBeenCalled();
    expect(firstElement[0].focus).toHaveBeenCalled();
    expect(firstElement[0].select).toHaveBeenCalled();
  });

  it('previous do not process first element', function() {
    controller.register(firstElement[0]);
    controller.register(secondElement[0]);

    controller.previous(0);
    expect(firstElement[0].blur).not.toHaveBeenCalled();
    expect(firstElement[0].select).not.toHaveBeenCalled();
    expect(secondElement[0].focus).not.toHaveBeenCalled();
  });

  it('previous do not process out of bound indexes', function() {
    controller.register(firstElement[0]);
    controller.register(secondElement[0]);

    controller.previous(-1);
    expect(firstElement[0].blur).not.toHaveBeenCalled();
    expect(firstElement[0].select).not.toHaveBeenCalled();
    expect(secondElement[0].focus).not.toHaveBeenCalled();

    controller.previous(2);
    expect(firstElement[0].blur).not.toHaveBeenCalled();
    expect(firstElement[0].select).not.toHaveBeenCalled();
    expect(secondElement[0].focus).not.toHaveBeenCalled();
  });
});
