'use strict';

describe('words module', function() {

  beforeEach(module('words'));

  describe('Sprint controller', function(){

    it('should be defined', inject(['$controller', function($controller) {
      var sprintCtrl = $controller('SprintCtrl');
      expect(sprintCtrl).toBeDefined();
    }]));

  });
});
