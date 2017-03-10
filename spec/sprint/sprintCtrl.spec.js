'use strict';

describe('SprintCtrl', function(){
  var controller, scope, sprintManagerService, scoreManagerService, quizModalManagerService;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
      var sprintManager = jasmine.createSpyObj('sprintManager', ['word', 'answer', 'isCorrect', 'isLoaded', 'clear']);
      sprintManager.init = jasmine.createSpy('init').and.callFake(function(callback) {
        callback();
      });
      sprintManager.isCorrect = jasmine.createSpy('isCorrect').and.callFake(function(answer) {
        return answer;
      });
      sprintManager.next = jasmine.createSpy('next').and.returnValues(true, false);

      $provide.value('sprintManager', sprintManager);

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

  beforeEach(inject(['$controller', '$rootScope', 'sprintManager', 'scoreManager', 'quizModalManager',
  function($controller, $rootScope, sprintManager, scoreManager, quizModalManager) {
    scope = $rootScope.$new();
    controller = $controller('SprintCtrl', {
      '$scope': scope,
      'scoreManager': scoreManager,
      'sprintManager': sprintManager,
      'quizModalManager': quizModalManager
    });
    sprintManagerService = sprintManager;
    scoreManagerService = scoreManager;
    quizModalManagerService = quizModalManager;
  }]));

  it('load question on init', function() {
    expect(sprintManagerService.init).toHaveBeenCalledWith(jasmine.any(Function));
    expect(controller.nav).toBeFalsy();
  });

  it('on correct answer', function() {
    controller.onAnswer(true);
    expect(sprintManagerService.isCorrect).toHaveBeenCalledWith(true);
    expect(scoreManagerService.onAnswer).toHaveBeenCalledWith('CORRECT');
    expect(sprintManagerService.next).toHaveBeenCalled();
  });

  it('on wrong answer', function() {
    controller.onAnswer(false);
    expect(sprintManagerService.isCorrect).toHaveBeenCalledWith(false);
    expect(scoreManagerService.onAnswer).not.toHaveBeenCalledWith('CORRECT');
    expect(sprintManagerService.next).toHaveBeenCalled();
  });

  it('navigate start navigation', function() {
    controller.navigate();
    expect(sprintManagerService.next).toHaveBeenCalled();
    expect(controller.nav).toBeTruthy();
  });

  it('score popup appears on navigation from last question', function() {
    controller.navigate();
    expect(quizModalManagerService.finishModal).not.toHaveBeenCalledWith('main');
    controller.navigate();
    expect(quizModalManagerService.finishModal).toHaveBeenCalledWith('main');
  });

  it('score popup appears on sprint time finished', function() {
    controller.onTimeFinished();
    expect(quizModalManagerService.finishModal).toHaveBeenCalledWith('main');
  });

  it('clear questions on state changed', function() {
    scope.$emit('$stateChangeStart');
    expect(sprintManagerService.clear).toHaveBeenCalled();
  });

});
