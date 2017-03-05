(function(){
  angular.module('words').directive('countdown', ['$interval', function($interval) {
    return {
      restrict: 'E',
      templateUrl: 'common/countdown.html',
      scope: {
        callback: '&'
      },
      link: function(scope, element, attrs) {
        scope.count = parseInt(attrs.count) || 30;
        var interval = $interval(function() {
          if(scope.count === 0) {
            $interval.cancel(interval);
            scope.callback();
          } else {
            --scope.count;
          }
        }, 1000);

        scope.$on('$destroy', function() {
          $interval.cancel(interval);
        });
      }
    };
  }]);
}());
