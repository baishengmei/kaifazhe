import { message } from 'antd';
import {
  CREATE_APP_SUCCESS,
  CREATE_APP_FAIL,
  CREATE_AD_POS_SUCCESS,
  CREATE_AD_POS_FAIL,
  SAVE_SELF_TEST,
} from '../../constants';
import {
  appDataChange,
  adPosDataChange,
  selfTestDataChange,
  editAdPos,
  editSelfTest,
  editToAudit,
  toAuditDataChange,
} from '../../actions/AppManagement/new';

const timeout = 32;
export default ({ getState, dispatch }) => next => action => {
  console.info(getState, dispatch, '这里备用');
  const ret = next(action);
  switch (action.type) {
    case CREATE_APP_SUCCESS: {
      setTimeout(() => {
        next(adPosDataChange('appTag', 'appTag', true));
        next(editAdPos());
      });
      break;
    }
    case CREATE_APP_FAIL: {
      console.info('你能否路过中间价');
      const { error } = action;
      if (error.code === 409) {
        message.error('应用名称重复');
      }
      break;
    }
    case CREATE_AD_POS_SUCCESS: {
      setTimeout(() => {
        next(selfTestDataChange('appTag', 'appTag', true));
        next(selfTestDataChange('adPosTag', 'adPosTag', true));
        next(editSelfTest());
      }, timeout);
      break;
    }
    case CREATE_AD_POS_FAIL: {
      //该项之后要删掉
      setTimeout(() => {
        next(selfTestDataChange('appTag', 'appTag', true));
        next(selfTestDataChange('adPosTag', 'adPosTag', true));
        next(editSelfTest());
      }, timeout);
      break;
    }
    case SAVE_SELF_TEST: {
      setTimeout(() => {
        next(toAuditDataChange('appTag', 'appTag', true));
        next(toAuditDataChange('adPosTag', 'adPosTag', true));
        next(toAuditDataChange('selfTestTag', 'selfTestTag', true));
        next(editToAudit());
      }, timeout);
      break;
    }
    default:
  }
  return ret;
};
