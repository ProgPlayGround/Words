'use strict';

describe('Sprint controller', function() {
  var scope, wordsLoader;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
        $provide.factory('mockWordsLoader', function() {
          return {
            getWords: jasmine.createSpy('getWords').and.returnValue({
              'word': 'car',
              'category': 'common',
              'translation': {
                'ua': ['автомобіль'],
                'ru': ['автомобиль']
                }
          })
        };
      });
    }]);
  });

  beforeEach(inject(['$rootScope', '$controller', 'mockWordsLoader',
  function($rootScope, $controller, mockWordsLoader) {
    scope = $rootScope.$new();
    wordsLoader = mockWordsLoader;
    $controller('SprintCtrl', {
      '$scope': scope,
      'wordsLoaderService': wordsLoader
    });
  }]));

  it('get words from loader service', function() {
    expect(wordsLoader.getWords).toHaveBeenCalled();
    expect(scope.data).toEqual({
      'word': 'car',
      'category': 'common',
      'translation': {
        'ua': ['автомобіль'],
        'ru': ['автомобиль']
      }
    });
  });

  it('create answer array', function() {
    expect(scope.data.translation.ua).toBeDefined();
    expect(scope.answer).toBeDefined();
    expect(scope.answer.length).toEqual(scope.data.translation.ua[0].length);
  });

  it('checkAnswer change answerState to NA if answer is empty', function() {
    scope.checkAnswer();
    expect(scope.answerState).toEqual('NA');
  });

  it('checkAnswer change answerState to INCORRECT if answer is full, but not correct', function() {

    for(var i = 0; i < scope.data.translation.ua[0].length; ++i) {
      scope.answer[i] = {char: 'a'};
    }

    scope.checkAnswer();
    expect(scope.answerState).toEqual('INCORRECT');
  });

  it('checkAnswer change answerState to CORRECT if answer is full and correct', function() {
    var position = 0;

    for(var elem of scope.data.translation.ua[0]) {
      scope.answer[position++] = {char: elem};
    }

    scope.checkAnswer();
    expect(scope.answerState).toEqual('CORRECT');
  });

  it('checkAnswer change answerState to NA if answer is partly correctly filled', function() {

    for(var i = 0; i < scope.data.translation.ua[0].length; ++i) {
      scope.answer[i];
    }

    scope.answer[1] = {char: scope.data.translation.ua[0][1]}

    scope.checkAnswer();
    expect(scope.answerState).toEqual('NA');
  });

  it('isCorrect is true if answer state is CORRECT', function() {
    scope.answerState = 'CORRECT';
    expect(scope.isCorrect()).toBeTruthy();
  });

  it('isCorrect is true if answer state is not CORRECT', function() {
    scope.answerState = 'NA';
    expect(scope.isCorrect()).toBeFalsy();
  });
});
