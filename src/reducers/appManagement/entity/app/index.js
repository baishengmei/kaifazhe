import { combineReducers } from 'redux';
import status from './status';
import appTag from './appTag';
import newApp from './newApp';

const app = combineReducers({
  status,
  appTag,
  newApp,
});

export default app;
