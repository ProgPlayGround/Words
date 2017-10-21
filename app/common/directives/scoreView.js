(function() {
  'use strict';

  angular.module('words').directive('scoreView', ['scoreManager', function(scoreManager) {

    return {
      restrict: 'E',
      templateUrl: 'common/directives/scoreView.html',
      scope: false,
      link: function(scope, element) {
        scope.score = scoreManager.get();
      }
    };
  }]);
}());
