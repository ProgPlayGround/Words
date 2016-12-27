(function(module) {
  'use strict';

  module.factory('requestCounter', ['$q', function($q) {
    var requests = 0;
    return {
      request: function(config) {
        requests += 1;
        return $q.when(config);
      },
      requestError: function(error) {
        requests -= 1;
        return $q.reject(error);
      },
      response: function(response) {
        requests -= 1;
        return $q.when(response);
      },
      responseError: function(error) {
        requests -= 1;
        return $q.reject(error);
      },
      requestCount: function() {
        return requests;
      }
    };
  }]);

  module.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('requestCounter');
  }]);
})(angular.module('words'));
