import { GO_TO_LOGIN_PAGE, LOGOUT } from '../constants';

export const goToLogin = payload => ({
  type: GO_TO_LOGIN_PAGE,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
  //   types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
  //   promise: http => http.get('/logout'),
});
