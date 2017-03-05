'use strict';

describe('EnQuizCtrl', function() {
  var scope, quizManagerService, quizModalManagerService, scoreManagerService, wordQuizCtrl;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
      var quizManager = jasmine.createSpyObj('quizManager',
      ['word', 'next', 'options', 'isLoaded', 'onLoad', 'clear']);
      quizManager.init = jasmine.createSpy('init').and.callFake(function(lang, callback) {
        callback();
      });
      quizManager.answer = jasmine.createSpy('answer').and.returnValue(2);
      quizManager.next = jasmine.createSpy('next').and.returnValues(true, false);

      $provide.value('quizManager', quizManager);

      $provide.factory('scoreManager', function() {
        return {
          get: jasmine.createSpy('get').and.returnValue(10),
          onAnswer: jasmine.createSpy('onAnswer').and.callThrough()
        };
      });

      $provide.factory('quizModalManager', function() {
        return jasmine.createSpyObj('quizModalManager', ['finishModal']);
      });
    }]);
  });

  beforeEach(inject(['$controller', '$rootScope', 'quizManager', 'scoreManager', 'quizModalManager',
  function($controller, $rootScope, quizManager, scoreManager, quizModalManager) {
    scope = $rootScope.$new();
    wordQuizCtrl = $controller('EnQuizCtrl', {
      '$scope': scope,
      'scoreManager': scoreManager,
      'quizManager': quizManager,
      'quizModalManager': quizModalManager
    });
    quizManagerService = quizManager;
    scoreManagerService = scoreManager;
    quizModalManagerService = quizModalManager;
  }]));

  it('load quiz on init', function() {
    var lang = 'en';
    expect(quizManagerService.init).toHaveBeenCalledWith(lang, jasmine.any(Function));
    expect(wordQuizCtrl.nav).toBeFalsy();
  });

  it('loadQuestion load new quiz and reset navigation', function() {
    wordQuizCtrl.loadQuestion();
    expect(quizManagerService.onLoad).toHaveBeenCalled();
    expect(wordQuizCtrl.nav).toBeFalsy();
  });

  it('isAnswered false when userAnswer is populated', function() {
    expect(wordQuizCtrl.isAnswered()).toBeFalsy();
  });

  it('isAnswered true when userAnswer is populated', function() {
    wordQuizCtrl.userAnswer = 2;
    expect(wordQuizCtrl.isAnswered()).toBeTruthy();
  });

  it('applyAnswer set correct and user answers', function() {
    wordQuizCtrl.applyAnswer(3);
    expect(wordQuizCtrl.correctAnswer).toBe(2);
    expect(wordQuizCtrl.userAnswer).toBe(3);
  });

  it('applyAnswer set user answer to -1 when it is not defined', function() {
    wordQuizCtrl.applyAnswer();
    expect(wordQuizCtrl.userAnswer).toBe(-1);
  });

  it('onNavigation pass NA to score manager when user hasn\'t answered', function() {
    wordQuizCtrl.onNavigation();
    expect(scoreManagerService.onAnswer).toHaveBeenCalledWith('NA');
  });

  it('onNavigation pass CORRECT to score manager when user has answered correctly', function() {
    wordQuizCtrl.userAnswer = 2;
    wordQuizCtrl.correctAnswer = 2;
    wordQuizCtrl.onNavigation();
    expect(scoreManagerService.onAnswer).toHaveBeenCalledWith('CORRECT');
  });

  it('onNavigation pass INCORRECT to score manager when user hasn\'t answered correctly', function() {
    wordQuizCtrl.userAnswer = 2;
    wordQuizCtrl.correctAnswer = 3;
    wordQuizCtrl.onNavigation();
    expect(scoreManagerService.onAnswer).toHaveBeenCalledWith('INCORRECT');
  });

  it('onNavigation start navigation when quiz hasn\'t been finished', function() {
    wordQuizCtrl.userAnswer = 2;
    wordQuizCtrl.correctAnswer = 3;
    wordQuizCtrl.onNavigation();
    expect(wordQuizCtrl.nav).toBeTruthy();
    expect(wordQuizCtrl.userAnswer).toBeNull();
    expect(wordQuizCtrl.correctAnswer).toBeNull();
  });

  it('onNavigation shows score popup when quiz has been finished', function() {
    wordQuizCtrl.onNavigation();
    expect(quizModalManagerService.finishModal).not.toHaveBeenCalledWith('main');
    wordQuizCtrl.onNavigation();
    expect(quizModalManagerService.finishModal).toHaveBeenCalledWith('main');
  });

  it('score call through to score manager', function() {
    wordQuizCtrl.score();
    expect(scoreManagerService.get).toHaveBeenCalled();
  });

  it('isLoaded call through to quiz manager', function() {
    wordQuizCtrl.isLoaded();
    expect(quizManagerService.isLoaded).toHaveBeenCalled();
  });

  it('word call through to quiz manager', function() {
    wordQuizCtrl.word();
    expect(quizManagerService.word).toHaveBeenCalled();
  });

  it('options call through to quiz manager', function() {
    wordQuizCtrl.options();
    expect(quizManagerService.options).toHaveBeenCalled();
  });

  it('clear quiz on state changed', function() {
    scope.$emit('$stateChangeStart');
    expect(quizManagerService.clear).toHaveBeenCalled();
  });
});
