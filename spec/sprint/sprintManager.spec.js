'use strict';

describe('sprint manager', function() {
  var sprintService, wordManagerService, url,
  question = {
    word: 'confirm',
    guess: 'підтверджувати',
    answer: true
  };

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
        $provide.factory('wordManager', function() {
          var wordManager = jasmine.createSpyObj('wordManager', ['nextWord', 'clear']);
          wordManager.init = jasmine.createSpy('init').and.callFake(function(url, callback) {
            callback();
          });
          wordManager.getWord = jasmine.createSpy('getWord').and.returnValue(question);
          return wordManager;
      });
    }]);
    inject(['sprintManager', 'wordManager', 'sprintUrl', function(sprintManager, wordManager, sprintUrl) {
      sprintService = sprintManager;
      wordManagerService = wordManager;
      url = sprintUrl;
    }]);
  });

  it('is not loaded before init', function() {
    expect(sprintService.isLoaded()).toBeFalsy();
  });

  it('init load question', function() {
    var callback = jasmine.createSpy('callback').and.callThrough();
    sprintService.init(callback);
    expect(wordManagerService.init).toHaveBeenCalledWith(url, jasmine.any(Function));
    expect(sprintService.isLoaded()).toBeTruthy();
    expect(callback).toHaveBeenCalled();
  });

  it('next load next question', function() {
    sprintService.next();
    expect(wordManagerService.nextWord).toHaveBeenCalled();
  });

  it('has question access methods', function() {
    sprintService.init(function(){});
    expect(sprintService.word()).toBe(question.word);
    expect(sprintService.answer()).toEqual(question.guess);
  });

  it('isCorrect return true on correct answer', function() {
    sprintService.init(function(){});
    expect(sprintService.isCorrect(true)).toBeTruthy();
  });

  it('isCorrect return false on incorrect answer', function() {
    sprintService.init(function(){});
    expect(sprintService.isCorrect(false)).toBeFalsy();
  });

  it('clear state', function() {
    sprintService.init(function(){});
    expect(sprintService.isLoaded()).toBeTruthy();
    sprintService.clear();
    expect(sprintService.isLoaded()).toBeFalsy();
  });
});
