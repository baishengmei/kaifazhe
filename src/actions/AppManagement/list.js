import {
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  GO_TO_APP_ADPOS_LIST,
} from '../../constants';

export const goToAppAdposList = tabItem => ({
  type: GO_TO_APP_ADPOS_LIST,
  tabItem,
});

// 可删除
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
