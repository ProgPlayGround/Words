(function(module) {
  'use strict';
  module.factory('wordLoader', ['$resource', function($resource) {
    return {
      allWords: function() {
        return $resource('http://localhost:3000/dictionary').query();
      }
    };
  }]);
})(angular.module('words'));
