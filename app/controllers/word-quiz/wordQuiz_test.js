'use strict';

describe('Word quiz controller', function() {
  var wordManager, wordQuizCtrl;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
        $provide.factory('mockWordManager', function() {
          return {
            getWord: jasmine.createSpy('getWord').and.returnValue({
              'word': 'car',
              'category': 'common',
              'translation': {
                'ua': ['автомобіль'],
                'ru': ['автомобиль']
                }
              }),
            has: jasmine.createSpy('has').and.callFake(function(index) {
              return index < 2;
            })
        };
      });
    }]);
  });

  beforeEach(inject(['$controller', 'mockWordManager',
  function($controller, mockWordManager) {
    wordManager = mockWordManager;
    wordQuizCtrl = $controller('WordQuizCtrl', {
      'wordManager': wordManager
    });
  }]));

  it('get words from loader service', function() {
    expect(wordManager.getWord).toHaveBeenCalled();
    expect(wordQuizCtrl.data).toEqual({
      'word': 'car',
      'category': 'common',
      'translation': {
        'ua': ['автомобіль'],
        'ru': ['автомобиль']
      }
    });
  });

  it('create answer array', function() {
    expect(wordQuizCtrl.data.translation.ua).toBeDefined();
    expect(wordQuizCtrl.answer).toBeDefined();
    expect(wordQuizCtrl.answer.length).toEqual(wordQuizCtrl.data.translation.ua[0].length);
  });

  it('checkAnswer change answerState to NA if answer is empty', function() {
    wordQuizCtrl.checkAnswer();
    expect(wordQuizCtrl.answerState).toEqual('NA');
  });

  it('checkAnswer change answerState to INCORRECT if answer is full, but not correct', function() {
    for(var i = 0; i < wordQuizCtrl.data.translation.ua[0].length; ++i) {
      wordQuizCtrl.answer[i] = {char: 'a'};
    }

    wordQuizCtrl.checkAnswer();
    expect(wordQuizCtrl.answerState).toEqual('INCORRECT');
  });

  it('checkAnswer change answerState to CORRECT if answer is full and correct', function() {
    var position = 0;

    _.forEach(wordQuizCtrl.data.translation.ua[0], function(elem) {
      wordQuizCtrl.answer[position++] = {char: elem};
    });

    wordQuizCtrl.checkAnswer();
    expect(wordQuizCtrl.answerState).toEqual('CORRECT');
  });

  it('checkAnswer change answerState to NA if answer is partly correctly filled', function() {
    for(var i = 0; i < wordQuizCtrl.data.translation.ua[0].length; ++i) {
      wordQuizCtrl.answer[i];
    }

    wordQuizCtrl.answer[1] = {char: wordQuizCtrl.data.translation.ua[0][1]}

    wordQuizCtrl.checkAnswer();
    expect(wordQuizCtrl.answerState).toEqual('NA');
  });

  it('isCorrect is true if answer state is CORRECT', function() {
    wordQuizCtrl.answerState = 'CORRECT';
    expect(wordQuizCtrl.isCorrect()).toBeTruthy();
  });

  it('isCorrect is true if answer state is not CORRECT', function() {
    wordQuizCtrl.answerState = 'NA';
    expect(wordQuizCtrl.isCorrect()).toBeFalsy();
  });

  it('nextWord increment word index', function() {
    expect(wordQuizCtrl.index).toBe(0);
    wordQuizCtrl.nextWord();
    expect(wordManager.has).toHaveBeenCalled();
    expect(wordQuizCtrl.index).toBe(1);
  });

  it('nextWord dont increment index for last word', function() {
    wordQuizCtrl.index = 1;
    wordQuizCtrl.nextWord();
    expect(wordManager.has).toHaveBeenCalled();
    expect(wordQuizCtrl.index).toBe(1);
  });

  it('applyAnswer set correct translation for the word', function() {
    wordQuizCtrl.applyAnswer();
    wordQuizCtrl.checkAnswer();
    expect(wordQuizCtrl.isCorrect()).toBe(true);
  });
});
