import { combineReducers } from 'redux';
import app from './app';
import adPos from './adPos';
import selfTest from './selfTest';
import toAudit from './toAudit';

export default combineReducers({
  app,
  adPos,
  selfTest,
  toAudit,
});
