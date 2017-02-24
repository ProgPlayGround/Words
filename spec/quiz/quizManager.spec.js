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
          return {
            init: jasmine.createSpy('init').and.callFake(function(url, callback) {
              callback();
            }),
            getWord: jasmine.createSpy('getWord').and.returnValue(quiz),
            nextWord: jasmine.createSpy('nextWord').and.callThrough()
        };
      });
    }]);
  });

  beforeEach(inject(['quizManager', 'wordManager', 'quizUrl', function(quizManager, wordManager, quizUrl) {
    quizManagerService = quizManager;
    wordManagerService = wordManager;
    url = quizUrl;
  }]));

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
    var lang = 'en';
    var callback = jasmine.createSpy('callback').and.callThrough();
    quizManagerService.init(lang, callback);
    expect(quizManagerService.word()).toBe(quiz.word);
    expect(quizManagerService.options()).toEqual(quiz.options);
    expect(quizManagerService.answer()).toBe(quiz.answer);
  });
});
