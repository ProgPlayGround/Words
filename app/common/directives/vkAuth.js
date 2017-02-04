(function() {
  'use strict';

  angular.module('words').directive('vkAuth', ['$window', '$timeout', function($window, $timeout) {
    return {
      restrict: 'A',
      scope: {
        callback: '&vkAuth'
      },
      link: function(scope, element) {
        $window.vkAsyncInit = function() {
          VK.init({
            apiId: '5847929'
          });

          scope.callback();
        };
        $timeout(function() {
          var el = angular.element('<script></script>');
          el.attr('type', 'text/javascript');
          el.attr('src','https://vk.com/js/api/openapi.js?139');
          el.attr('async', true);
          element.append(el);
        }, 0);
      }
    }
  }]);
})();
