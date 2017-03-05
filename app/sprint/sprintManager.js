(function() {
  angular.module('words').factory('sprintManager', ['wordManager', function(wordManager) {
    return {
      word: function() {
        return 'sprint';
      },
      answer: function() {
        return 'спринт';
      },
      isCorrect: function(answer) {
        return answer === 'YES';
      },
      load: function() {

      },
      next: function() {
        return false;
      },
      isLoaded: function() {
        return true;
      }
    };
  }]);
}());
