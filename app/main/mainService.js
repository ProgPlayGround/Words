(function() {
  'use strict';

  angular.module('words').factory('mainService', function() {

    var all = {name: 'All Categories'};
    var currentCategory = all;

    return {
      selectedCategory: function() {
        return currentCategory;
      },
      newCategory: function(newCategory) {
        currentCategory = newCategory;
      },
      clear: function() {
        currentCategory = all;
      }
    };
  });
}());
