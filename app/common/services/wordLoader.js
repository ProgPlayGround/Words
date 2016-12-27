(function() {
  'use strict';
  angular.module('words').factory('wordLoader', ['$resource', function($resource) {
    return {
      allWords: function() {
        return $resource('http://localhost:3000/dictionary').query();
      }
    };
  }]);
})();
