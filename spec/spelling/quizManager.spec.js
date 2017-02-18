'use strict';

describe('quiz manager', function() {
  var quizManagerService, wordManagerService, callback;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
        $provide.factory('wordManager', function() {
          return {
            init: jasmine.createSpy('init').and.callFake(function(callback) {
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

  beforeEach(inject(['quizManager', 'wordManager', function(quizManager, wordManager) {
    quizManagerService = quizManager;
    wordManagerService = wordManager;

    callback = jasmine.createSpy('callback').and.callThrough();
    quizManagerService.init(callback);
  }]));

  it('init load quiz', function() {
    expect(quizManagerService.isLoaded()).toBeTruthy();
    expect(quizManagerService.state()).toEqual('NA');
    expect(quizManagerService.answer()).toBeDefined();
    expect(callback).toHaveBeenCalled();
  });

  it('onLoad set default quiz state', function() {
    quizManagerService.onLoad();

    expect(quizManagerService.isLoaded()).toBeTruthy();
    expect(quizManagerService.state()).toEqual('NA');
    expect(quizManagerService.answer()).toBeDefined();
  });

  it('next load next word', function() {
    wordManagerService.hasNext = jasmine.createSpy('hasNext').and.returnValue(true);
    quizManagerService.next();

    expect(wordManagerService.hasNext).toHaveBeenCalled();
    expect(wordManagerService.nextWord).toHaveBeenCalled();
  });

  it('next doesn\'t load next word', function() {
    wordManagerService.hasNext = jasmine.createSpy('hasNext').and.returnValue(false);
    quizManagerService.next();

    expect(wordManagerService.hasNext).toHaveBeenCalled();
    expect(wordManagerService.nextWord).not.toHaveBeenCalled();
  });

  it('checkAnswer change answer state to NA if answer is empty', function() {
    quizManagerService.checkAnswer();
    expect(quizManagerService.state()).toEqual('NA');
  });

  it('checkAnswer change answerState to INCORRECT if answer is full, but not correct', function() {
    for(var i = 0; i < quizManagerService.translation().length; ++i) {
      quizManagerService.answer()[i] = {char: 'a'};
    }

    quizManagerService.checkAnswer();
    expect(quizManagerService.state()).toEqual('INCORRECT');
  });

  it('checkAnswer change answerState to CORRECT if answer is full and correct', function() {
    var position = 0;

    _.forEach(quizManagerService.translation(), function(elem) {
      quizManagerService.answer()[position++] = {char: elem};
    });

    quizManagerService.checkAnswer();
    expect(quizManagerService.state()).toEqual('CORRECT');
  });

  it('checkAnswer change answerState to NA if answer is partly correctly filled', function() {
    quizManagerService.answer()[1] = {char: quizManagerService.translation()[1]}

    quizManagerService.checkAnswer();
    expect(quizManagerService.state()).toEqual('NA');
  });

  it('applyAnswer set answer from word translation', function() {
    quizManagerService.applyAnswer();

    _.forEach(quizManagerService.answer(), function(elem, index) {
      expect(elem.char).toEqual(quizManagerService.translation()[index]);
    });
  });

  it('isCorrect is true if answer state is CORRECT', function() {
    var position = 0;
    _.forEach(quizManagerService.translation(), function(elem) {
      quizManagerService.answer()[position++] = {char: elem};
    });
    quizManagerService.checkAnswer();

    expect(quizManagerService.isCorrect()).toBeTruthy();
  });

  it('isCorrect is false if answer state is not CORRECT', function() {
    for(var i = 0; i < quizManagerService.translation().length; ++i) {
      quizManagerService.answer()[i] = {char: 'a'};
    }

    quizManagerService.checkAnswer();

    expect(quizManagerService.isCorrect()).toBeFalsy();
  });
});
