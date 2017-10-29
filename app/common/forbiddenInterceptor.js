(function() {
  'use strict';
  angular.module('words').factory('forbiddenInterceptor', ['$injector', '$q', function($injector, $q) {
    return {
      responseError: function(error) {
        if(error.status == 401 || error.status == 403) {
          $injector.get('$state').go('auth.login');
        } else {
          return $q.reject(error);
        }
      }
    }
  }]);
}());
