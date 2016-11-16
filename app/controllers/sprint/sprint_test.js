'use strict';

describe('Sprint controller', function() {

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
        $provide.service('mockWordsLoader', function() {
        this.getWords = jasmine.createSpy('getWords').and.returnValue({
          'word': 'car',
          'category': 'common',
          'translation': {
            'ua': ['автомобіль'],
            'ru': ['автомобиль']
          }
        });
      });
    }]);
  });

  it('get words from loader service', inject(['$controller', '$rootScope', 'mockWordsLoader',
  function($controller, $rootScope, mockWordsLoader) {
    var mockScope = $rootScope.$new();
    var sprintCtrl = $controller('SprintCtrl', {
      '$scope': mockScope,
      'wordsLoaderService': mockWordsLoader
    });

    expect(sprintCtrl).toBeDefined();
    expect(mockWordsLoader.getWords).toHaveBeenCalled();
    expect(mockScope.data).toEqual({
      'word': 'car',
      'category': 'common',
      'translation': {
        'ua': ['автомобіль'],
        'ru': ['автомобиль']
      }
    });
  }]));

  it('should create anwer array', inject(['$controller', '$rootScope', 'mockWordsLoader',
  function($controller, $rootScope, mockWordsLoader) {
    var mockScope = $rootScope.$new();
    var sprintCtrl = $controller('SprintCtrl', {
      '$scope': mockScope,
      'wordsLoaderService': mockWordsLoader
    });

    expect(sprintCtrl).toBeDefined();
    expect(mockScope.data.translation.ua).toBeDefined();
    expect(mockScope.answer).toBeDefined();
    expect(mockScope.answer.length).toEqual(mockScope.data.translation.ua[0].length);
  }]));
});
