'use strict';

describe('Word quiz controller', function() {
  var spellingManagerService, quizModalManagerService, scoreManagerService, wordQuizCtrl;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
      var spellingManager = jasmine.createSpyObj('spellingManager',
      ['next', 'onLoad', 'applyAnswer', 'isCorrect', 'checkAnswer',
      'word', 'isLoaded', 'translation', 'definition', 'inSentence', 'answer']);
      spellingManager.init = jasmine.createSpy('init').and.callFake(function(callback) {
        callback();
      });
      spellingManager.state = jasmine.createSpy('state').and.returnValues('NA');

      $provide.value('spellingManager', spellingManager);

      $provide.factory('scoreManager', function() {
        return {
          get: jasmine.createSpy('get').and.returnValue(10),
          onAnswer: jasmine.createSpy('onAnswer').and.callThrough(),
          useSolution: jasmine.createSpy('useSolution').and.callThrough(),
          useHint: jasmine.createSpy('useHint').and.callThrough()
        };
      });
    }]);
    
    inject(['$controller', 'spellingManager', 'scoreManager', 'quizModalManager',
    function($controller, spellingManager, scoreManager, quizModalManager) {
      wordQuizCtrl = $controller('WordQuizCtrl', {
        'spellingManager': spellingManager,
        'scoreManager': scoreManager,
        'quizModalManager': quizModalManager
      });
      spellingManagerService = spellingManager;
      scoreManagerService = scoreManager;
      quizModalManagerService = quizModalManager;
    }]);
  });

  it('load question on init', function() {
    expect(spellingManagerService.init).toHaveBeenCalled();
    expect(wordQuizCtrl.nav).toBeFalsy();
  });

  it('loading text is set', function() {
    expect(wordQuizCtrl.loadingText).toBeDefined();
  });

  it('loadQuestion retrives new word and reset to initial state', function() {
    wordQuizCtrl.loadQuestion();
    expect(spellingManagerService.onLoad).toHaveBeenCalled();
    expect(wordQuizCtrl.nav).toBeFalsy();
  });

  it('onNavigation move to next word in a dictionary', function() {
    spellingManagerService.next = jasmine.createSpy('next').and.returnValue(true);
    wordQuizCtrl.onNavigation();
    expect(spellingManagerService.state).toHaveBeenCalled();
    expect(scoreManagerService.onAnswer).toHaveBeenCalledWith('NA');
    expect(spellingManagerService.next).toHaveBeenCalled();
    expect(wordQuizCtrl.nav).toBeTruthy();
  });

  it('onNavigation show score for last word', function() {
    spellingManagerService.next = jasmine.createSpy('next').and.returnValue(false);
    spyOn(quizModalManagerService, 'finishModal');
    wordQuizCtrl.onNavigation();
    expect(scoreManagerService.onAnswer).toHaveBeenCalledWith('NA');
    expect(spellingManagerService.next).toHaveBeenCalled();
    expect(wordQuizCtrl.nav).toBeFalsy();
    expect(quizModalManagerService.finishModal).toHaveBeenCalled();
  });

  it('applyAnswer set correct answer for the quiz', function() {
    wordQuizCtrl.applyAnswer();
    expect(spellingManagerService.applyAnswer).toHaveBeenCalled();
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
    expect(spellingManagerService.isCorrect).toHaveBeenCalled();
  });

  it('checkAnswer call through to quiz manager', function() {
    wordQuizCtrl.checkAnswer();
    expect(spellingManagerService.checkAnswer).toHaveBeenCalled();
  });

  it('isLoaded call through to quiz manager', function() {
    wordQuizCtrl.isLoaded();
    expect(spellingManagerService.isLoaded).toHaveBeenCalled();
  });

  it('state call through to quiz manager', function() {
    wordQuizCtrl.answerState();
    expect(spellingManagerService.state).toHaveBeenCalled();
  });

  it('word call through to quiz manager', function() {
    wordQuizCtrl.word();
    expect(spellingManagerService.word).toHaveBeenCalled();
  });

  it('translation call through to quiz manager', function() {
    wordQuizCtrl.translation();
    expect(spellingManagerService.translation).toHaveBeenCalled();
  });

  it('answer call through to quiz manager', function() {
    wordQuizCtrl.answer();
    expect(spellingManagerService.answer).toHaveBeenCalled();
  });

  it('definition call through to quiz manager', function() {
    wordQuizCtrl.definition();
    expect(spellingManagerService.definition).toHaveBeenCalled();
  });

  it('inSentence call through to quiz manager', function() {
    wordQuizCtrl.inSentence();
    expect(spellingManagerService.inSentence).toHaveBeenCalled();
  });
});
