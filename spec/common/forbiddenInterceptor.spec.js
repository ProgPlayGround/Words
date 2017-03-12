'use strict';

describe('forbidden interceptor', function() {
  var forbiddenInterceptorService, state, q;

  beforeEach(function() {
    module('words');
    inject(['forbiddenInterceptor', '$state', '$q', function(forbiddenInterceptor, $state, $q) {
      forbiddenInterceptorService = forbiddenInterceptor
      state = $state;
      q = $q;
      spyOn(state,'go');
      spyOn(q, 'reject');
    }]);
  });

  it('navigates to auth.login on 403 error', function() {
    forbiddenInterceptorService.responseError({status: 403});
    expect(state.go).toHaveBeenCalledWith('auth.login');
  });

  it('rejects when error code isn\'t 403', function() {
    var errorResponse = {status: 500}
    forbiddenInterceptorService.responseError(errorResponse);
    expect(q.reject).toHaveBeenCalledWith(errorResponse);
  });

});
