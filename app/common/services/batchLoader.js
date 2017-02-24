(function() {
  'use strict';
  angular.module('words').factory('batchLoader', ['$resource', 'httpAuthHeaders', function($resource, httpAuthHeaders) {
    return {
      load: function(url) {
        return $resource(url, {}, {
          'query': {
            'method': 'GET',
            'headers': httpAuthHeaders.header(),
            'isArray': true
          }
        }).query();
      }
    };
  }]);
}());
