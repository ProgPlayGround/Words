'use strict';

describe('score manager service', function() {
  var scoreManagerService;

  beforeEach(module('words'));

  beforeEach(inject(['scoreManager', function(scoreManager) {
    scoreManagerService = scoreManager;
  }]));

  it('initialize with 0 score', function() {
    expect(scoreManagerService.get()).toBe(0);
  });

  it('onAnswer increase current score for CORRECT answer', function() {
    var state = 'CORRECT';
    scoreManagerService.onAnswer(state);
    expect(scoreManagerService.get()).toBe(50);
  });

  it('onAnswer doesn\'t increase current state for not CORRECT answer', function() {
    var state = 'INCORRECT';
    scoreManagerService.onAnswer(state);
    expect(scoreManagerService.get()).toBe(0);
  });

  it('useSolution set score on CORRECT answer to 0', function() {
    var state = 'CORRECT';
    scoreManagerService.useSolution();
    scoreManagerService.onAnswer(state);
    expect(scoreManagerService.get()).toBe(0);
  });

  it('useHint set score on CORRECT answer to 25', function() {
    var state = 'CORRECT';
    scoreManagerService.useHint();
    scoreManagerService.onAnswer(state);
    expect(scoreManagerService.get()).toBe(25);
  });

  it('onAnswer reset score for next answer to 50', function() {
      var state = 'CORRECT';
      scoreManagerService.onAnswer(state);
      scoreManagerService.onAnswer(state);
      expect(scoreManagerService.get()).toBe(100);
  });
});
