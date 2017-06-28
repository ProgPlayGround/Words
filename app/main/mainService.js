(function() {
  'use strict';

  angular.module('words').factory('mainService', function() {

    var currentCategory = 'All';

    return {
      selectCategory: function() {
        return currentCategory;
      },
      newCategory: function(newCategory) {
        currentCategory = newCategory;
      }
    };
  });
}());
