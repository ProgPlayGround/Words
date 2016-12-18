'use strict';

describe('word loader service', function() {
  var wordLoaderService;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
      $provide.value('$resource', function(){
        return {
          query: jasmine.createSpy('query').and.returnValues([{
            word: 'firstMock'
          }, {
            word: 'secondMock'
          }])
        };
      });
    }]);
  });

  beforeEach(inject(['wordLoader', function(wordLoader) {
    wordLoaderService = wordLoader;
  }]));

  it('has methods to query dictionary', function() {
    expect(wordLoaderService.allWords).toBeDefined();
  });

  it('allWords retrieve data from dictionary resource', function() {
    expect(wordLoaderService.allWords()).toEqual([
      { word: 'firstMock' },
      { word: 'secondMock' }
    ]);
  });
});
