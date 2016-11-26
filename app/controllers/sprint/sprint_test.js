'use strict';

describe('Sprint controller', function() {
  var wordsLoader, sprintCtrl;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
        $provide.factory('mockWordsLoader', function() {
          return {
            getWords: jasmine.createSpy('getWords').and.returnValue({
              'word': 'car',
              'category': 'common',
              'translation': {
                'ua': ['автомобіль'],
                'ru': ['автомобиль']
                }
          })
        };
      });
    }]);
  });

  beforeEach(inject(['$controller', 'mockWordsLoader',
  function($controller, mockWordsLoader) {
    wordsLoader = mockWordsLoader;
    sprintCtrl = $controller('SprintCtrl', {
      'wordManager': wordsLoader
    });
  }]));

  it('get words from loader service', function() {
    expect(wordsLoader.getWords).toHaveBeenCalled();
    expect(sprintCtrl.data).toEqual({
      'word': 'car',
      'category': 'common',
      'translation': {
        'ua': ['автомобіль'],
        'ru': ['автомобиль']
      }
    });
  });

  it('create answer array', function() {
    expect(sprintCtrl.data.translation.ua).toBeDefined();
    expect(sprintCtrl.answer).toBeDefined();
    expect(sprintCtrl.answer.length).toEqual(sprintCtrl.data.translation.ua[0].length);
  });

  it('checkAnswer change answerState to NA if answer is empty', function() {
    sprintCtrl.checkAnswer();
    expect(sprintCtrl.answerState).toEqual('NA');
  });

  it('checkAnswer change answerState to INCORRECT if answer is full, but not correct', function() {

    for(var i = 0; i < sprintCtrl.data.translation.ua[0].length; ++i) {
      sprintCtrl.answer[i] = {char: 'a'};
    }

    sprintCtrl.checkAnswer();
    expect(sprintCtrl.answerState).toEqual('INCORRECT');
  });

  it('checkAnswer change answerState to CORRECT if answer is full and correct', function() {
    var position = 0;

    for(var elem of sprintCtrl.data.translation.ua[0]) {
      sprintCtrl.answer[position++] = {char: elem};
    }

    sprintCtrl.checkAnswer();
    expect(sprintCtrl.answerState).toEqual('CORRECT');
  });

  it('checkAnswer change answerState to NA if answer is partly correctly filled', function() {

    for(var i = 0; i < sprintCtrl.data.translation.ua[0].length; ++i) {
      sprintCtrl.answer[i];
    }

    sprintCtrl.answer[1] = {char: sprintCtrl.data.translation.ua[0][1]}

    sprintCtrl.checkAnswer();
    expect(sprintCtrl.answerState).toEqual('NA');
  });

  it('isCorrect is true if answer state is CORRECT', function() {
    sprintCtrl.answerState = 'CORRECT';
    expect(sprintCtrl.isCorrect()).toBeTruthy();
  });

  it('isCorrect is true if answer state is not CORRECT', function() {
    sprintCtrl.answerState = 'NA';
    expect(sprintCtrl.isCorrect()).toBeFalsy();
  });
});
