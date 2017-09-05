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
      load: function(url, isArray, transformResponse) {
        var query = {
          'method': 'GET',
          'headers': httpAuthHeaders.header(),
          'isArray': isArray !== false
        };

        if(transformResponse) {
          query.transformResponse = transformResponse;
        }
        
        return $resource(url, {}, {
          'query': query
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
      multpart: function(url, method, data, transformRequest) {
        return $resource(url, {}, {
          'exec': {
            method: method,
            transformRequest: transformRequest,
            headers: httpAuthHeaders.header({'Content-Type': undefined})
          }
        }).exec(data);
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
