(function() {
  'use strict';
  angular.module('words').factory('wordLoader', ['$resource', '$cookies', function($resource, $cookies) {
    return {
      allWords: function() {
        return $resource('https://localhost:3000/dictionary', {}, {
          'query': {
            'method': 'GET',
            'headers': {
              'authorization': 'Basic ' + $cookies.get('token')
            },
            'isArray': true
          }
        }).query();
      }
    };
  }]);
})();
