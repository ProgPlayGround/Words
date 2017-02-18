'use strict';

describe('Word quiz controller', function() {
  var quizManagerService, quizModalManagerService, scoreManagerService, wordQuizCtrl;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
      var quizManager = jasmine.createSpyObj('quizManger',
      ['next', 'onLoad', 'applyAnswer', 'isCorrect', 'checkAnswer',
      'word', 'isLoaded', 'translation', 'definition', 'inSentence', 'answer']);
      quizManager.init = jasmine.createSpy('init').and.callFake(function(callback) {
        callback();
      });
      quizManager.state = jasmine.createSpy('state').and.returnValues('NA');

      $provide.value('quizManager', quizManager);

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

  beforeEach(inject(['$controller', 'quizManager', 'scoreManager', 'quizModalManager',
  function($controller, quizManager, scoreManager, quizModalManager) {
    wordQuizCtrl = $controller('WordQuizCtrl', {
      'quizManager': quizManager,
      'scoreManager': scoreManager,
      'quizModalManager': quizModalManager
    });
    quizManagerService = quizManager;
    scoreManagerService = scoreManager;
    quizModalManagerService = quizModalManager;
  }]));

  it('load question on init', function() {
    expect(quizManagerService.init).toHaveBeenCalled();
    expect(wordQuizCtrl.nav).toBeFalsy();
  });

  it('loading text is set', function() {
    expect(wordQuizCtrl.loadingText).toBeDefined();
  });

  it('loadQuestion retrives new word and reset to initial state', function() {
    wordQuizCtrl.loadQuestion();
    expect(quizManagerService.onLoad).toHaveBeenCalled();
    expect(wordQuizCtrl.nav).toBeFalsy();
  });

  it('onNavigation move to next word in a dictionary', function() {
    quizManagerService.next = jasmine.createSpy('next').and.returnValue(true);
    wordQuizCtrl.onNavigation();
    expect(quizManagerService.state).toHaveBeenCalled();
    expect(scoreManagerService.onAnswer).toHaveBeenCalledWith('NA');
    expect(quizManagerService.next).toHaveBeenCalled();
    expect(wordQuizCtrl.nav).toBeTruthy();
  });

  it('onNavigation show score for last word', function() {
    quizManagerService.next = jasmine.createSpy('next').and.returnValue(false);
    spyOn(quizModalManagerService, 'finishModal');
    wordQuizCtrl.onNavigation();
    expect(scoreManagerService.onAnswer).toHaveBeenCalledWith('NA');
    expect(quizManagerService.next).toHaveBeenCalled();
    expect(wordQuizCtrl.nav).toBeFalsy();
    expect(quizModalManagerService.finishModal).toHaveBeenCalled();
  });

  it('applyAnswer set correct answer for the quiz', function() {
    wordQuizCtrl.applyAnswer();
    expect(quizManagerService.applyAnswer).toHaveBeenCalled();
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

  it('isCorrect call through to quiz manager', function() {
    wordQuizCtrl.isCorrect();
    expect(quizManagerService.isCorrect).toHaveBeenCalled();
  });

  it('checkAnswer call through to quiz manager', function() {
    wordQuizCtrl.checkAnswer();
    expect(quizManagerService.checkAnswer).toHaveBeenCalled();
  });

  it('isLoaded call through to quiz manager', function() {
    wordQuizCtrl.isLoaded();
    expect(quizManagerService.isLoaded).toHaveBeenCalled();
  });

  it('state call through to quiz manager', function() {
    wordQuizCtrl.answerState();
    expect(quizManagerService.state).toHaveBeenCalled();
  });

  it('word call through to quiz manager', function() {
    wordQuizCtrl.word();
    expect(quizManagerService.word).toHaveBeenCalled();
  });

  it('translation call through to quiz manager', function() {
    wordQuizCtrl.translation();
    expect(quizManagerService.translation).toHaveBeenCalled();
  });

  it('answer call through to quiz manager', function() {
    wordQuizCtrl.answer();
    expect(quizManagerService.answer).toHaveBeenCalled();
  });

  it('definition call through to quiz manager', function() {
    wordQuizCtrl.definition();
    expect(quizManagerService.definition).toHaveBeenCalled();
  });

  it('inSentence call through to quiz manager', function() {
    wordQuizCtrl.inSentence();
    expect(quizManagerService.inSentence).toHaveBeenCalled();
  });
});
