'use strict';

describe('quiz manager', function() {
  var quizManagerService, wordManagerService, url,
  quiz = {
    word: 'confirm',
    options: ['випробовувати', 'стверджувати', 'закохувати', 'спричиняти'],
    answer: 1
  };

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
        $provide.factory('wordManager', function() {
          var wordManager = jasmine.createSpyObj('wordManager', ['nextWord', 'clear']);
          wordManager.init = jasmine.createSpy('init').and.callFake(function(url, callback) {
            callback();
          });
          wordManager.getWord = jasmine.createSpy('getWord').and.returnValue(quiz);
          return wordManager;
      });
    }]);

    inject(['quizManager', 'wordManager', 'config', function(quizManager, wordManager, config) {
      quizManagerService = quizManager;
      wordManagerService = wordManager;
      url = config.apiUrl + '/quiz/';
    }]);
  });

  it('is not loaded before init', function() {
    expect(quizManagerService.isLoaded()).toBeFalsy();
  });

  it('init load quiz', function() {
    var lang = 'en';
    var callback = jasmine.createSpy('callback').and.callThrough();
    quizManagerService.init(lang, callback);
    expect(wordManagerService.init).toHaveBeenCalledWith(url + lang, jasmine.any(Function));
    expect(quizManagerService.isLoaded()).toBeTruthy();
    expect(callback).toHaveBeenCalled();
  });

  it('next load next word', function() {
    quizManagerService.next();
    expect(wordManagerService.nextWord).toHaveBeenCalled();
  });

  it('has quiz access methods', function() {
    quizManagerService.init('en', function(){});
    expect(quizManagerService.word()).toBe(quiz.word);
    expect(quizManagerService.options()).toEqual(quiz.options);
    expect(quizManagerService.answer()).toBe(quiz.answer);
  });

  it('clear state', function() {
    quizManagerService.init('en', function(){});
    expect(quizManagerService.isLoaded()).toBeTruthy();
    quizManagerService.clear();
    expect(quizManagerService.isLoaded()).toBeFalsy();
  });
});
