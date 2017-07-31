(function(){
  angular.module('words').directive('countdown', ['$interval', function($interval) {
    return {
      restrict: 'E',
      template: '<div class="countdown">' +
        '<div class="count">{{count}}</div>' +
        '</div>',
      scope: {
        callback: '&',
        isFinished: '='
      },
      link: function(scope, element, attrs) {

        scope.count = parseInt(attrs.count) || 30;
        var interval = $interval(function() {
          if(scope.count === 0 || scope.isFinished) {
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
