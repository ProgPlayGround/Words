'use strict';

describe('spelling manager', function() {
  var spellingManagerService, wordManagerService, callback;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
        $provide.factory('wordManager', function() {
          return {
            init: jasmine.createSpy('init').and.callFake(function(url, callback) {
              callback();
            }),
            getWord: jasmine.createSpy('getWord').and.returnValue({
              'word': 'car',
              'category': 'common',
              'translation': {
                'ua': ['автомобіль'],
                'ru': ['автомобиль']
                }
              }),
            nextWord: jasmine.createSpy('nextWord').and.callThrough()
        };
      });
    }]);
  });

  beforeEach(inject(['spellingManager', 'wordManager', function(spellingManager, wordManager) {
    spellingManagerService = spellingManager;
    wordManagerService = wordManager;

    callback = jasmine.createSpy('callback').and.callThrough();
    spellingManagerService.init(callback);
  }]));

  it('init load quiz', function() {
    expect(spellingManagerService.isLoaded()).toBeTruthy();
    expect(spellingManagerService.state()).toEqual('NA');
    expect(spellingManagerService.answer()).toBeDefined();
    expect(callback).toHaveBeenCalled();
  });

  it('onLoad set default quiz state', function() {
    spellingManagerService.onLoad();

    expect(spellingManagerService.isLoaded()).toBeTruthy();
    expect(spellingManagerService.state()).toEqual('NA');
    expect(spellingManagerService.answer()).toBeDefined();
  });

  it('next load next word', function() {
    spellingManagerService.next();
    expect(wordManagerService.nextWord).toHaveBeenCalled();
  });

  it('checkAnswer change answer state to NA if answer is empty', function() {
    spellingManagerService.checkAnswer();
    expect(spellingManagerService.state()).toEqual('NA');
  });

  it('checkAnswer change answerState to INCORRECT if answer is full, but not correct', function() {
    for(var i = 0; i < spellingManagerService.translation().length; ++i) {
      spellingManagerService.answer()[i] = {char: 'a'};
    }

    spellingManagerService.checkAnswer();
    expect(spellingManagerService.state()).toEqual('INCORRECT');
  });

  it('checkAnswer change answerState to CORRECT if answer is full and correct', function() {
    var position = 0;

    _.forEach(spellingManagerService.translation(), function(elem) {
      spellingManagerService.answer()[position++] = {char: elem};
    });

    spellingManagerService.checkAnswer();
    expect(spellingManagerService.state()).toEqual('CORRECT');
  });

  it('checkAnswer change answerState to NA if answer is partly correctly filled', function() {
    spellingManagerService.answer()[1] = {char: spellingManagerService.translation()[1]}

    spellingManagerService.checkAnswer();
    expect(spellingManagerService.state()).toEqual('NA');
  });

  it('applyAnswer set answer from word translation', function() {
    spellingManagerService.applyAnswer();

    _.forEach(spellingManagerService.answer(), function(elem, index) {
      expect(elem.char).toEqual(spellingManagerService.translation()[index]);
    });
  });

  it('isCorrect is true if answer state is CORRECT', function() {
    var position = 0;
    _.forEach(spellingManagerService.translation(), function(elem) {
      spellingManagerService.answer()[position++] = {char: elem};
    });
    spellingManagerService.checkAnswer();

    expect(spellingManagerService.isCorrect()).toBeTruthy();
  });

  it('isCorrect is false if answer state is not CORRECT', function() {
    for(var i = 0; i < spellingManagerService.translation().length; ++i) {
      spellingManagerService.answer()[i] = {char: 'a'};
    }

    spellingManagerService.checkAnswer();

    expect(spellingManagerService.isCorrect()).toBeFalsy();
  });
});
