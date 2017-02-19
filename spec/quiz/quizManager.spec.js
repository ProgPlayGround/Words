'use strict';

describe('quiz manager', function() {
  var quizManagerService, wordManagerService, callback;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
        $provide.factory('wordManager', function() {
          return {
            init: jasmine.createSpy('init').and.callFake(function(url, callback) {
              callback();
            }),
            getWord: jasmine.createSpy('getWord').and.returnValue( {
              word: 'confirm',
              options: ['випробовувати', 'стверджувати', 'закохувати', 'спричиняти'],
              answer: 1
            }),
            nextWord: jasmine.createSpy('nextWord').and.callThrough()
        };
      });
    }]);
  });

  beforeEach(inject(['quizManager', 'wordManager', function(quizManager, wordManager) {
    quizManagerService = quizManager;
    wordManagerService = wordManager;

    callback = jasmine.createSpy('callback').and.callThrough();
    quizManagerService.init(callback);
  }]));

  fit('init load quiz', function() {
    // expect(quizManagerService.isLoaded()).toBeTruthy();
    expect(callback).toHaveBeenCalled();
  });

});
