'use strict';

describe('split filter', function() {
  beforeEach(module('words'));

  it('should split a input string', inject(['$filter', function($filter) {
    var split = $filter('split');
    expect(split('','')).toEqual([]);
    expect(split('a book','')).toEqual(['a',' ','b','o','o','k']);
    expect(split('a car',' ')).toEqual(['a','car']);
    expect(split('a|b','|')).toEqual(['a','b']);
  }]));
});
