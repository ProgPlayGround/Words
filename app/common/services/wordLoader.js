(function() {
  'use strict';
  angular.module('words').factory('wordLoader', ['$resource', 'httpAuthHeaders', function($resource, httpAuthHeaders) {
    return {
      allWords: function() {
        console.log(httpAuthHeaders.header());
        return $resource('https://localhost:3000/dictionary', {}, {
          'query': {
            'method': 'GET',
            'headers': httpAuthHeaders.header(),
            'isArray': true
          }
        }).query();
      }
    };
  }]);
})();
