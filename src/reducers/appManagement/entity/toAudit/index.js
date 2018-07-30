import { combineReducers } from 'redux';
import status from './status';
import appTag from './appTag';
import adPosTag from './adPosTag';
import selfTestTag from './selfTestTag';
import toAuditTag from './toAuditTag';
import uploadScreenShot from './uploadScreenShot';
import uploadInstallPackage from './uploadInstallPackage';

const selfTest = combineReducers({
  status,
  appTag,
  adPosTag,
  selfTestTag,
  toAuditTag,
  uploadScreenShot,
  uploadInstallPackage,
});

export default selfTest;
