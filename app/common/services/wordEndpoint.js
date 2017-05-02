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
          'post': {
            'method': 'POST',
            'headers': httpAuthHeaders.header()
          }
        }).post(data);
      },
      uploadImg: function(url, data) {
        return $resource(url, {}, {
          'post': {
            method: 'POST',
            transformRequest: function(data) {
              if(data === undefined) {
                return data;
              }
              var fd = new FormData();
              fd.append('file', data);
              return fd;
            },
            headers: _.extend(httpAuthHeaders.header(), {'Content-Type': undefined})
          }
        }).post(data);
      },
      patch: function(url, data) {
        return $resource(url, {}, {
          'patch': {
            'method': 'PATCH',
            'headers': httpAuthHeaders.header()
          }
        }).patch(data);
      },
      delete: function(url, data) {
        return $resource(url, {}, {
          'delete': {
            'method': 'DELETE',
            'headers': httpAuthHeaders.header()
          }
        }).delete(data);
      }
    };
  }]);
}());
