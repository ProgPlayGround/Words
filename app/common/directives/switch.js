(function() {
  'use strict';

  angular.module('words').directive('switch', function() {

    return {
      restrict: 'E',
      templateUrl: 'common/directives/switch.html',
      scope: {
        value:'=',
        initialState: '@',
        onChange: '&onChange'
      },
      link: function(scope, element) {
        scope.state = scope.initialState == 'true';

        var textElement = element[0].getElementsByClassName('main-duplicates-text')[0];
        textElement = angular.element(textElement);
        element.on('change', function(event) {
          scope.state = !scope.state;
          if(scope.state) {
            textElement.addClass('on');
          } else {
            textElement.removeClass('on');
          }
          scope.onChange({'state': scope.state});
          scope.$apply();
        });
      }
    };
  });
}());
