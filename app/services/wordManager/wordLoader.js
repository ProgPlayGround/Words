'use strict';

angular.module('words').factory('wordLoader', ['$q', '$http', function($q, $http) {

  return {
    load: function() {
      var deferred = $q.defer();

      $http.get('http://localhost:3000/dictionary').then(function(res) {
        deferred.resolve(res.data);
      }, function(err) {
        console.log(err);
        deferred.reject(err);
      });

      return deferred.promise;
    }
  }
}]);
