import { combineReducers } from 'redux';
import status from './status';
import appTag from './appTag';
import adPosTag from './adPosTag';
import adPosInfo from './adPosInfo';
import styleInfo from './styleInfo';

const adPos = combineReducers({
  status,
  appTag,
  adPosTag,
  adPosInfo,
  styleInfo,
});

export default adPos;
