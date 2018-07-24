import { combineReducers } from 'redux';
import auth from './auth';
import runtime from './runtime';
import appManagement from './appManagement';

export default combineReducers({
  auth: auth,
  appManagement: appManagement,
  runtime: runtime,
});
