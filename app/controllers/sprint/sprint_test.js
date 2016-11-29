'use strict';

describe('Sprint controller', function() {
  var wordManager, sprintCtrl;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
        $provide.factory('mockWordManager', function() {
          return {
            getWord: jasmine.createSpy('getWord').and.returnValue({
              'word': 'car',
              'category': 'common',
              'translation': {
                'ua': ['автомобіль'],
                'ru': ['автомобиль']
                }
              }),
            has: jasmine.createSpy('has').and.callFake(function(index) {
              return index < 2;
            })
        };
      });
    }]);
  });

  beforeEach(inject(['$controller', 'mockWordManager',
  function($controller, mockWordManager) {
    wordManager = mockWordManager;
    sprintCtrl = $controller('SprintCtrl', {
      'wordManager': wordManager
    });
  }]));

  it('get words from loader service', function() {
    expect(wordManager.getWord).toHaveBeenCalled();
    expect(sprintCtrl.data).toEqual({
      'word': 'car',
      'category': 'common',
      'translation': {
        'ua': ['автомобіль'],
        'ru': ['автомобиль']
      }
    });
  });

  it('create answer array', function() {
    expect(sprintCtrl.data.translation.ua).toBeDefined();
    expect(sprintCtrl.answer).toBeDefined();
    expect(sprintCtrl.answer.length).toEqual(sprintCtrl.data.translation.ua[0].length);
  });

  it('checkAnswer change answerState to NA if answer is empty', function() {
    sprintCtrl.checkAnswer();
    expect(sprintCtrl.answerState).toEqual('NA');
  });

  it('checkAnswer change answerState to INCORRECT if answer is full, but not correct', function() {

    for(var i = 0; i < sprintCtrl.data.translation.ua[0].length; ++i) {
      sprintCtrl.answer[i] = {char: 'a'};
    }

    sprintCtrl.checkAnswer();
    expect(sprintCtrl.answerState).toEqual('INCORRECT');
  });

  it('checkAnswer change answerState to CORRECT if answer is full and correct', function() {
    var position = 0;

    _.forEach(sprintCtrl.data.translation.ua[0], function(elem) {
      sprintCtrl.answer[position++] = {char: elem};
    });

    sprintCtrl.checkAnswer();
    expect(sprintCtrl.answerState).toEqual('CORRECT');
  });

  it('checkAnswer change answerState to NA if answer is partly correctly filled', function() {

    for(var i = 0; i < sprintCtrl.data.translation.ua[0].length; ++i) {
      sprintCtrl.answer[i];
    }

    sprintCtrl.answer[1] = {char: sprintCtrl.data.translation.ua[0][1]}

    sprintCtrl.checkAnswer();
    expect(sprintCtrl.answerState).toEqual('NA');
  });

  it('isCorrect is true if answer state is CORRECT', function() {
    sprintCtrl.answerState = 'CORRECT';
    expect(sprintCtrl.isCorrect()).toBeTruthy();
  });

  it('isCorrect is true if answer state is not CORRECT', function() {
    sprintCtrl.answerState = 'NA';
    expect(sprintCtrl.isCorrect()).toBeFalsy();
  });

  it('nextWord increment word index', function() {
    expect(sprintCtrl.index).toBe(0);
    sprintCtrl.nextWord();
    expect(wordManager.has).toHaveBeenCalled();
    expect(sprintCtrl.index).toBe(1);
  });

  it('nextWord dont increment index for last word', function() {
    sprintCtrl.index = 1;
    sprintCtrl.nextWord();
    expect(wordManager.has).toHaveBeenCalled();
    expect(sprintCtrl.index).toBe(1);
  });
});
