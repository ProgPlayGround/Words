'use strict';

describe('focus directive', function() {
  var mockScope, controller;

  beforeEach(module('words'));

  beforeEach(inject(['$rootScope', '$compile', function($rootScope, $compile){
    mockScope = $rootScope.$new();
    var directive = $compile('<focus></focus>')(mockScope);
    controller = directive.controller('focus');
  }]));

  it('watch empty elements array on creation', function() {
    expect(mockScope.elements).toBeDefined();
    expect(mockScope.elements.length).toEqual(0);
  });

  it('has methods to operate with elements array', function() {
    expect(controller.register).toBeDefined();
    expect(controller.next).toBeDefined();
    expect(controller.previous).toBeDefined();
  });

  it('allows registration of elements to watch', function() {
    var element = angular.element('<div></div>');

    expect(controller.register).toBeDefined();
    controller.register(element);
    expect(mockScope.elements.length).toEqual(1);
  });

  it('next blur current element, focus and select next', function() {
    var firstElement = angular.element('<div></div>');
    var secondElement = angular.element('<div></div>');

    secondElement[0].select = function() {};

    spyOn(firstElement[0], 'blur');
    spyOn(secondElement[0], 'select');
    spyOn(secondElement[0], 'focus');

    controller.register(firstElement[0]);
    controller.register(secondElement[0]);
    controller.next(0);

    expect(firstElement[0].blur).toHaveBeenCalled();
    expect(secondElement[0].select).toHaveBeenCalled();
    expect(secondElement[0].focus).toHaveBeenCalled();
  });

  it('next only select last element', function() {
    var firstElement = angular.element('<div></div>');
    var secondElement = angular.element('<div></div>');

    secondElement[0].select = function() {};

    spyOn(firstElement[0], 'blur');
    spyOn(secondElement[0], 'select');
    spyOn(secondElement[0], 'focus');

    controller.register(firstElement[0]);
    controller.register(secondElement[0]);
    controller.next(1);

    expect(firstElement[0].blur).not.toHaveBeenCalled();
    expect(secondElement[0].select).toHaveBeenCalled();
    expect(secondElement[0].focus).not.toHaveBeenCalled();
  });

  it('next do not process out of bound indexes', function() {
    var firstElement = angular.element('<div></div>');
    var secondElement = angular.element('<div></div>');

    secondElement[0].select = function() {};

    spyOn(firstElement[0], 'blur');
    spyOn(secondElement[0], 'select');
    spyOn(secondElement[0], 'focus');

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

  it('previous blur current element, focus and select next', inject(['$rootScope', '$compile', function($rootScope, $compile) {
    var firstElement = angular.element('<div>a</div>');
    var secondElement = angular.element('<div>a</div>');
    $compile(firstElement)($rootScope);
    $compile(secondElement)($rootScope);

    firstElement[0].select = function() {};

    spyOn(firstElement[0], 'focus');
    spyOn(firstElement[0], 'select');
    spyOn(secondElement[0], 'blur');

    controller.register(firstElement[0]);
    controller.register(secondElement[0]);
    controller.previous(1);

    expect(secondElement[0].blur).toHaveBeenCalled();
    expect(firstElement[0].focus).toHaveBeenCalled();
    expect(firstElement[0].select).toHaveBeenCalled();
  }]));

  it('previous do not process first element', function() {
    var firstElement = angular.element('<div></div>');
    var secondElement = angular.element('<div></div>');

    firstElement[0].select = function() {};

    spyOn(firstElement[0], 'blur');
    spyOn(firstElement[0], 'select');
    spyOn(secondElement[0], 'focus');

    controller.register(firstElement[0]);
    controller.register(secondElement[0]);

    controller.previous(0);
    expect(firstElement[0].blur).not.toHaveBeenCalled();
    expect(firstElement[0].select).not.toHaveBeenCalled();
    expect(secondElement[0].focus).not.toHaveBeenCalled();
  });

  it('previous do not process out of bound indexes', function() {
    var firstElement = angular.element('<div></div>');
    var secondElement = angular.element('<div></div>');

    firstElement[0].select = function() {};

    spyOn(firstElement[0], 'blur');
    spyOn(firstElement[0], 'select');
    spyOn(secondElement[0], 'focus');

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
