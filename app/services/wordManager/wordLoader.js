'use strict';

angular.module('words').factory('wordLoader', ['$resource', function($resource) {
    return $resource('http://localhost:3000/dictionary');  
}]);
