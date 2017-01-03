'use strict';

describe('User profile controller', function() {
  var userProfileCtrl, profileManagerService, profile;

  beforeEach(function() {
    module('words');
    module(['$provide', function($provide) {

      profile = {
        'profile': 'mockProfile'
      };
      $provide.factory('profileManager', function() {
        return {
          'profile': jasmine.createSpy('profile').and.returnValue(profile)
        };
      });
    }]);
  });

  beforeEach(inject(['$controller', 'profileManager', function($controller, profileManager) {
    userProfileCtrl = $controller('UserProfileCtrl', {
      'profileManager': profileManager
    });
    profileManagerService = profileManager;
  }]));

  it('profile tab is selected and active on init', function() {
    var tab = 'profile';
    expect(userProfileCtrl.selected).toBe(tab);
    expect(userProfileCtrl.isActive(tab)).toBeTruthy();
  });

  it('profile is loaded from profile manager', function() {
    expect(profileManagerService.profile).toHaveBeenCalled();
    expect(userProfileCtrl.profile).toEqual(profile);
  });


  it('select change selected tab', function() {
    var tab = 'new';
    expect(userProfileCtrl.selected).not.toBe(tab);
    userProfileCtrl.select(tab);
    expect(userProfileCtrl.selected).toBe(tab);
  });

  it('isActive returns true for selected tab', function() {
    var tab = 'profile';
    expect(userProfileCtrl.isActive(tab)).toBeTruthy();
    tab = 'new';
    userProfileCtrl.select(tab);
    expect(userProfileCtrl.isActive(tab)).toBeTruthy();
  });
});
