'use strict';

angular.module('myApp.version.version-directive', [])

.directive('appVersion', ['version', function(version) {
  //eslint-disable-next-line no-unused-vars
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]);
