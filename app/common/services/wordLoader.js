(function() {
  'use strict';
  angular.module('words').factory('wordLoader', ['$resource', '$cookies', function($resource, $cookies) {
    return {
      allWords: function() {
        return $resource('http://localhost:3000/dictionary', {}, {
          'query': {
            'method': 'GET',
            'headers': {
              'x-access-token': $cookies.get('token')
            },
            'isArray': true
          }
        }).query();
      }
    };
  }]);
})();
