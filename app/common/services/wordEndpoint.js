(function() {
  'use strict';
  angular.module('words').factory('wordEndpoint', ['$resource', 'httpAuthHeaders', function($resource, httpAuthHeaders) {
    return {
      load: function(url, isArray) {
        var requiredArray = isArray !== false;
        return $resource(url, {}, {
          'query': {
            'method': 'GET',
            'headers': httpAuthHeaders.header(),
            'isArray': requiredArray
          }
        }).query();
      },
      post: function(url, data) {
        return $resource(url, {}, {
          'headers': httpAuthHeaders.header()
        }).save(data);
      },
      patch: function(url, data) {
        return $resource(url, {}, {
          'patch': {
            'method': 'PATCH',
            'headers': httpAuthHeaders.header()
          }
        }).patch(data);
      }
    };
  }]);
}());
