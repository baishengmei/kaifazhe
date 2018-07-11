import {
  GO_TO_LOGIN_PAGE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../constants';

export const goToLogin = payload => ({
  type: GO_TO_LOGIN_PAGE,
  payload,
});

export const logout = () => ({
  types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
  //   types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
  //   promise: http => http.get('/logout'),
  promise: http =>
    http.get('/api/home/detail', {
      query: {
        dateRange: '2018-06-20,2018-07-10',
      },
    }),
});
