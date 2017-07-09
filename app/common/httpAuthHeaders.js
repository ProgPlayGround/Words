(function() {
  'use strict';

  angular.module('words').factory('httpAuthHeaders', ['$cookies', function($cookies) {
    return {
      header: function(extended) {
        var headers = {
          'auth-type': $cookies.get('auth-type'),
          'auth-token': $cookies.get('token')
        };

        return angular.isDefined(extended) ? _.extend(headers, extended) : headers;
      }
    };
  }]);
}());
