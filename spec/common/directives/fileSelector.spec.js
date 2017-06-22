'use strict';

describe('file selector directive', function() {
  var scope, element;

  beforeEach(function() {
    module('words');
    inject(['$rootScope', '$compile', function($rootScope, $compile){
      scope = $rootScope.$new();
      element = $compile('<input type="file" file-selector="fileSelector" selection-error="selectionError"/>')(scope);
      scope.$apply();
    }]);
  });

  it('don\'t select file when file selection was canceled', function() {
    element.triggerHandler('change');
    expect(scope.selectionError).toBeFalsy();
    expect(scope.fileSelector).not.toBeDefined();
  });

  it('select file when size is less then 100kb', function() {
    element[0].files[0] = {size: 100};
    element.triggerHandler('change');
    expect(scope.selectionError).toBeFalsy();
    expect(scope.fileSelector).toEqual(element[0].files[0]);
  });

  it('set selection error when file size is more then 100kb', function() {
    element[0].files[0] = {size: 100000};
    element.triggerHandler('change');
    expect(scope.selectionError).toBeTruthy();
    expect(scope.fileSelector).not.toBeDefined();
  });
});
