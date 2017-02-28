(function() {
  angular.module('words').controller('SprintCtrl', ['sprintManager', function(sprintManager) {
    var vm = this;
    vm.loadingText = 'Loading...';
    vm.score = function() {
      return 50;
    }
  }]);
}());
