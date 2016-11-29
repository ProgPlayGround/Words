'use strict';

describe('apply-answer directive', function() {
  var mockScope, element;

  beforeEach(module('words'));

  beforeEach(inject(['$rootScope', '$compile', function($rootScope, $compile){
    mockScope = $rootScope.$new();
    element = angular.element('<div apply-answer ng-model="model"></div>');
    $compile(element)(mockScope);
  }]));

  it('applies "no_answer" class for "NA" model', function() {
    mockScope.model = 'NA';
    mockScope.$apply();
    expect(element.hasClass('word_card_no_answer')).toBeTruthy();
    expect(element.hasClass('word_card_wrong_answer')).toBeFalsy();
    expect(element.hasClass('word_card_correct_answer')).toBeFalsy();
  });

  it('applies "correct_answer" class for "CORRECT" model', function() {
    mockScope.model = 'CORRECT';
    mockScope.$apply();
    expect(element.hasClass('word_card_correct_answer')).toBeTruthy();
    expect(element.hasClass('word_card_wrong_answer')).toBeFalsy();
    expect(element.hasClass('word_card_no_answer')).toBeFalsy();
  });

  it('applies "wrong_answer" class for "ERROR" model', function() {
    mockScope.model = 'ERROR';
    mockScope.$apply();
    expect(element.hasClass('word_card_wrong_answer')).toBeTruthy();
    expect(element.hasClass('word_card_no_answer')).toBeFalsy();
    expect(element.hasClass('word_card_correct_answer')).toBeFalsy();
  });
});
