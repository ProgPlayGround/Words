(function() {
  'use strict';
  
  angular.module('words').factory('wordEndpoint', ['$resource', 'httpAuthHeaders', function($resource, httpAuthHeaders) {

    function transformFormRequest(data) {
      if(angular.isDefined(data)) {
        var fd = new FormData();
        fd.append('file', data);
        return fd;
      }
      return data;
    }

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
            transformRequest: transformFormRequest,
            headers: httpAuthHeaders.header({'Content-Type': undefined})
          }
        }).post(data);
      },
      replaceImg: function(url, data) {
        return $resource(url, {}, {
          'put': {
            method: 'PUT',
            transformRequest: transformFormRequest,
            headers: httpAuthHeaders.header({'Content-Type': undefined})
          }
        }).put(data);
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
