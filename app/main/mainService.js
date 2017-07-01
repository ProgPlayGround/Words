(function() {
  'use strict';

  angular.module('words').factory('mainService', function() {

    var currentCategory = {name: 'All Categories'};

    return {
      selectedCategory: function() {
        return currentCategory;
      },
      newCategory: function(newCategory) {
        currentCategory = newCategory;
      }
    };
  });
}());
