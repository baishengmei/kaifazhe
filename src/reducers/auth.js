import { LOGOUT } from '../constants';

const initialState = {
  status: 'initial',
  user: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      return {
        user: null,
        status: 'logout_success',
      };
    default:
      return state;
  }
}
