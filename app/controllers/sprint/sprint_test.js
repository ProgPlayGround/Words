'use strict';

describe('Sprint controller', function() {

  beforeEach(function() {
    module('words');
    module(function($provide) {
        $provide.service('mockWordsLoader', function() {
        this.getWords = jasmine.createSpy('getWords').and.returnValue({"word":"mockWord"});
      });
    });
  });

  it('should get words from loader service', inject(['$controller', '$rootScope', 'mockWordsLoader',
  function($controller, $rootScope, mockWordsLoader) {
    var mockScope = $rootScope.$new();
    var sprintCtrl = $controller('SprintCtrl', {
      '$scope': mockScope,
      'wordsLoaderService': mockWordsLoader
    });
    expect(sprintCtrl).toBeDefined();
    expect(mockWordsLoader.getWords).toHaveBeenCalled();
    expect(mockScope.data).toEqual({"word":"mockWord"});
  }]));
});
