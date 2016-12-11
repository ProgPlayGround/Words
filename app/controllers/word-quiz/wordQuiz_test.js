'use strict';

describe('Word quiz controller', function() {
  var wordManager, scoreManager, wordQuizCtrl;

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
            nextWord: jasmine.createSpy('nextWord').and.callThrough(),
            hasNext: jasmine.createSpy('hasNext').and.returnValues(true, false)
        };
      });
      $provide.factory('mockScoreManager', function() {
        return {
          get: jasmine.createSpy('get').and.returnValue(10),
          onAnswer: jasmine.createSpy('onAnswer').and.callThrough(),
          useSolution: jasmine.createSpy('useSolution').and.callThrough(),
          useHint: jasmine.createSpy('useHint').and.callThrough()
        };
      });
    }]);
  });

  beforeEach(inject(['$controller', 'mockWordManager', 'mockScoreManager',
  function($controller, mockWordManager, mockScoreManager) {
    wordManager = mockWordManager;
    scoreManager = mockScoreManager;
    wordQuizCtrl = $controller('WordQuizCtrl', {
      'wordManager': wordManager,
      'scoreManager': scoreManager
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

  it('load question on init', function() {
    expect(wordManager.getWord).toHaveBeenCalled();
    expect(wordQuizCtrl.nav).toBeFalsy();
    expect(wordQuizCtrl.answerState).toEqual('NA');
    _.each(wordQuizCtrl.answer, function(data) {
      expect(data).toEqual({});
    });
    expect(wordQuizCtrl.answer.length).toEqual(wordQuizCtrl.data.translation.ua[0].length);
  });

  it('loadQuestion retrives new word and reset to initial state', function() {
    wordQuizCtrl.loadQuestion();
    expect(wordManager.getWord).toHaveBeenCalled();
    expect(wordQuizCtrl.nav).toBeFalsy();
    expect(wordQuizCtrl.answerState).toEqual('NA');
    _.each(wordQuizCtrl.answer, function(data) {
      expect(data).toEqual({});
    });
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

  it('startNavigation move to next word in a dictionary', function() {
    wordQuizCtrl.startNavigation();
    expect(scoreManager.onAnswer).toHaveBeenCalled();
    expect(wordManager.hasNext).toHaveBeenCalled();
    expect(wordQuizCtrl.nav).toBeTruthy();
    expect(wordManager.nextWord).toHaveBeenCalled();
  });

  it('startNavigation do nothing for last word', function() {
    wordQuizCtrl.startNavigation();
    wordQuizCtrl.loadQuestion();
    wordQuizCtrl.startNavigation();
    expect(scoreManager.onAnswer).toHaveBeenCalledTimes(2);
    expect(wordManager.hasNext).toHaveBeenCalledTimes(2);
    expect(wordQuizCtrl.nav).toBeFalsy();
    expect(wordManager.nextWord).toHaveBeenCalledTimes(1);
  });

  it('applyAnswer set correct translation for the word', function() {
    wordQuizCtrl.applyAnswer();
    wordQuizCtrl.checkAnswer();
    expect(wordQuizCtrl.isCorrect()).toBe(true);
    expect(scoreManager.useSolution).toHaveBeenCalled();
  });

  it('hint call through to score manager', function() {
    wordQuizCtrl.hint();
    expect(scoreManager.useHint).toHaveBeenCalled();
  });

  it('score call through to score manager', function() {
    wordQuizCtrl.score();
    expect(scoreManager.get).toHaveBeenCalled();
  });
});
