(function() {
  'use strict';

  angular.module('words').directive('switch', function() {

    return {
      restrict: 'E',
      templateUrl: 'common/directives/switch.html',
      scope: {
        on: '@',
        off: '@',
        onChange: '&onChange'
      },
      link: function(scope, element) {
        var textElement = element[0].getElementsByClassName('main-duplicates-text')[0];
        scope.state = true;
        textElement = angular.element(textElement);
        element.on('change', function(event) {
          scope.state = !scope.state;
          if(scope.state) {
            textElement.removeClass('off');
            textElement.addClass('on');
          } else {
            textElement.removeClass('on');
            textElement.addClass('off');
          }
          scope.onChange({'state': scope.state});
          scope.$apply();
        });
      }
    };
  });
}());
