'use strict';

describe('Dictionary controller', function() {
  var scope, words, dictionaryCtrl, dictionaryManager, translationManager, dictionaryModalManager;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {
      words = [
        {
          word: 'word',
          translation: ['слово'],
          imageUrl: 'image1',
          audioUrl: 'audio1'
        },
        {
          word: 'dictionary',
          translation: ['словник'],
          imageUrl: 'image2',
          audioUrl: 'audio2'
        }
      ];

      dictionaryManager = jasmine.createSpyObj('dictionaryManager', ['save', 'remove']);
      dictionaryManager.getWords = jasmine.createSpy('getWords').and.returnValue(words);

      $provide.value('dictionaryManager', dictionaryManager);

      translationManager = jasmine.createSpyObj('translationManager', ['translate']);
      var translation = {'$promise': {
        'then': jasmine.createSpy('then').and.callFake(function(callback) {
          callback(['словник']);
        })
      }};

      translationManager.translate = jasmine.createSpy('translate').and.returnValue(translation);

      $provide.value('translationManager', translationManager);

      dictionaryModalManager = jasmine.createSpyObj('dictionaryModalManager', ['addImg', 'wordCard']);

      $provide.value('dictionaryModalManager', dictionaryModalManager);
    }]);

    inject(['$controller', '$rootScope', '$log', 'dictionaryManager', 'translationManager', 'dictionaryModalManager',
    function($controller, $rootScope, $log, dictionaryManager, translationManager, dictionaryModalManager) {
      scope = $rootScope.$new();
      dictionaryCtrl = $controller('DictionaryCtrl', {
        '$scope': scope,
        '$log': $log,
        'dictionaryManager': dictionaryManager,
        'translationManager': translationManager,
        'dictionaryModalManager': dictionaryModalManager
      });
    }]);
  });

  it('all checked is false on init', function() {
    expect(dictionaryCtrl.allChecked).toBeFalsy();
  });

  it('words retrieved on init', function() {
    expect(dictionaryCtrl.words).toEqual(words);
  });

  it('audios is empty on init', function() {
    expect(dictionaryCtrl.audios).toEqual({});
  });

  it('checkall set all words checked', function() {
    dictionaryCtrl.allChecked = true;
    dictionaryCtrl.checkAll();

    _.each(words, function(word) {
      expect(word.checked).toBeTruthy();
    });
  });

  it('changeImg delegate to dictionaryModalManager', function() {
    dictionaryCtrl.changeImg(words[0]);
    expect(dictionaryModalManager.addImg).toHaveBeenCalledWith(words[0]);
  });

  it('showCard delegate to dictionaryModalManager', function() {
    dictionaryCtrl.showCard(words[0]);
    expect(dictionaryModalManager.wordCard).toHaveBeenCalledWith(words[0]);
  });

  it('checked is true when any element is checked', function() {
    words[0].checked = true;
    var isChecked = dictionaryCtrl.checked();

    expect(isChecked).toBeTruthy();
  });

  it('checked is false when all elements are unchecked', function() {
    var isChecked = dictionaryCtrl.checked();

    expect(isChecked).toBeFalsy();
  });

  it('removeChecked don\'t delegate to dictionary manager remove when all elements are unchecked', function() {
    dictionaryCtrl.removeChecked();

    expect(dictionaryManager.remove).not.toHaveBeenCalled();
  });

  it('removeChecked delegate to dictionary manager remove when elements are checked', function() {
    words[0].checked = true;
    words[1].checked = true;

    dictionaryCtrl.removeChecked();

    expect(dictionaryManager.remove).toHaveBeenCalledWith(words);
  });

  it('remove delegate to dictionary manager', function() {
    dictionaryCtrl.remove(words[0]);

    expect(dictionaryManager.remove).toHaveBeenCalledWith([words[0]]);
  });

  it('save delegate to dictionary manager with search and translation', function() {
    dictionaryCtrl.search = 'search';
    dictionaryCtrl.addPopover.translation = 'translation';
    dictionaryCtrl.save();

    expect(dictionaryManager.save).toHaveBeenCalledWith('search', 'translation');
    expect(dictionaryCtrl.search).toBe('');
    expect(dictionaryCtrl.addPopover.isOpen).toBeFalsy();
    expect(dictionaryCtrl.addPopover.translation).toBe('');
  });

  it('sound play word\'s audio file', function() {
    dictionaryCtrl.sound(words[0]);
    expect(dictionaryCtrl.audios[words[0].word]).toBeDefined();
  });

  it('sound play word\'s audio file', function() {
    dictionaryCtrl.sound(words[0]);
    expect(dictionaryCtrl.audios[words[0].word]).toBeDefined();
  });

  it('add retrieve translation from translation manager', function() {
    dictionaryCtrl.search = 'search';
    dictionaryCtrl.add();

    expect(translationManager.translate).toHaveBeenCalledWith(dictionaryCtrl.search);
    expect(dictionaryCtrl.addPopover.translation).toBe('словник');
  });

});
