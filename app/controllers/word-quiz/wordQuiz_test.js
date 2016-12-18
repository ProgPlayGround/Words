'use strict';

describe('Word quiz controller', function() {
  var wordManagerService, scoreManagerService, wordQuizCtrl, uibModal;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
        $provide.factory('wordManager', function() {
          return {
            init: jasmine.createSpy('init').and.callFake(function(onSuccess) {
              onSuccess();
            }),
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
      $provide.factory('scoreManager', function() {
        return {
          get: jasmine.createSpy('get').and.returnValue(10),
          onAnswer: jasmine.createSpy('onAnswer').and.callThrough(),
          useSolution: jasmine.createSpy('useSolution').and.callThrough(),
          useHint: jasmine.createSpy('useHint').and.callThrough()
        };
      });
    }]);
  });

  beforeEach(inject(['$controller', 'wordManager', 'scoreManager', '$uibModal',
  function($controller, wordManager, scoreManager, $uibModal) {
    wordManagerService = wordManager;
    scoreManagerService = scoreManager;
    wordQuizCtrl = $controller('WordQuizCtrl', {
      'wordManager': wordManager,
      'scoreManager': scoreManager
    });
    uibModal = $uibModal;
  }]));

  it('initialize word manager service', function() {
    expect(wordManagerService.init).toHaveBeenCalled();
  });

  it('load question on init', function() {
    expect(wordManagerService.getWord).toHaveBeenCalled();
    expect(wordQuizCtrl.nav).toBeFalsy();
    expect(wordQuizCtrl.answerState).toEqual('NA');
    _.each(wordQuizCtrl.answer, function(data) {
      expect(data).toEqual({});
    });
    expect(wordQuizCtrl.answer.length).toEqual(wordQuizCtrl.data.translation.ua[0].length);
  });

  it('loadQuestion retrives new word and reset to initial state', function() {
    wordQuizCtrl.loadQuestion();
    expect(wordManagerService.getWord).toHaveBeenCalled();
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
    expect(scoreManagerService.onAnswer).toHaveBeenCalled();
    expect(wordManagerService.hasNext).toHaveBeenCalled();
    expect(wordQuizCtrl.nav).toBeTruthy();
    expect(wordManagerService.nextWord).toHaveBeenCalled();
  });

  it('startNavigation show score for last word', function() {
    spyOn(uibModal, 'open');

    wordQuizCtrl.startNavigation();
    wordQuizCtrl.loadQuestion();
    wordQuizCtrl.startNavigation();
    expect(scoreManagerService.onAnswer).toHaveBeenCalledTimes(2);
    expect(wordManagerService.hasNext).toHaveBeenCalledTimes(2);
    expect(wordQuizCtrl.nav).toBeFalsy();
    expect(wordManagerService.nextWord).toHaveBeenCalledTimes(1);
    expect(uibModal.open).toHaveBeenCalled();
  });

  it('applyAnswer set correct translation for the word', function() {
    wordQuizCtrl.applyAnswer();
    wordQuizCtrl.checkAnswer();
    expect(wordQuizCtrl.isCorrect()).toBe(true);
    expect(scoreManagerService.useSolution).toHaveBeenCalled();
  });

  it('hint call through to score manager', function() {
    wordQuizCtrl.hint();
    expect(scoreManagerService.useHint).toHaveBeenCalled();
  });

  it('score call through to score manager', function() {
    wordQuizCtrl.score();
    expect(scoreManagerService.get).toHaveBeenCalled();
  });
});
