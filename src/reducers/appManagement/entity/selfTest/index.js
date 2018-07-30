import { combineReducers } from 'redux';
import status from './status';
import appTag from './appTag';
import adPosTag from './adPosTag';
import selfTestTag from './selfTestTag';
import selfTestDevice from './selfTestDevice';

const selfTest = combineReducers({
  status,
  appTag,
  adPosTag,
  selfTestTag,
  selfTestDevice,
});

export default selfTest;
