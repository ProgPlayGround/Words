'use strict';

describe('apply-answer directive', function() {
  var scope, element;

  beforeEach(function() {
    module('words');
    module(function ($urlRouterProvider) {
      $urlRouterProvider.deferIntercept();
    });
  });

  beforeEach(inject(['$rootScope', '$compile', function($rootScope, $compile){
    element = angular.element('<div apply-answer="model"></div>');
    scope = $rootScope.$new();
    $compile(element)(scope);
  }]));

  it('applies "no_answer" class for "NA" model', function() {
    scope.model = 'NA';
    scope.$apply();
    expect(element.hasClass('word_no_answer')).toBeTruthy();
    expect(element.hasClass('border_wrong_answer')).toBeFalsy();
    expect(element.hasClass('border_correct_answer')).toBeFalsy();
  });

  it('applies "correct_answer" class for "CORRECT" model', function() {
    scope.model = 'CORRECT';
    scope.$apply();
    expect(element.hasClass('border_correct_answer')).toBeTruthy();
    expect(element.hasClass('border_wrong_answer')).toBeFalsy();
    expect(element.hasClass('word_no_answer')).toBeFalsy();
  });

  it('applies "wrong_answer" class for "ERROR" model', function() {
    scope.model = 'ERROR';
    scope.$apply();
    expect(element.hasClass('border_wrong_answer')).toBeTruthy();
    expect(element.hasClass('word_no_answer')).toBeFalsy();
    expect(element.hasClass('border_correct_answer')).toBeFalsy();
  });
});
