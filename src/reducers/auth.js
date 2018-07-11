import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL } from '../constants';

const initialState = {
  status: 'initial',
  user: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        user: null,
        status: 'logout_success',
      };
    case LOGOUT_SUCCESS:
      return state;
    case LOGOUT_FAIL:
      return state;
    default:
      return state;
  }
};

export default user;
