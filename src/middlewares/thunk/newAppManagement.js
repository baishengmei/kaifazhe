import { message } from 'antd';
import {
  CREATE_APP_SUCCESS,
  CREATE_APP_FAIL,
  CREATE_AD_POS_SUCCESS,
  CREATE_AD_POS_FAIL,
  SAVE_SELF_TEST,
  CREATE_TO_AUDIT_SUCCESS,
  CREATE_TO_AUDIT_FAIL,
  GO_TO_APP_LIST,
} from '../../constants';
import {
  adPosDataChange,
  selfTestDataChange,
  editAdPos,
  editSelfTest,
  editToAudit,
  toAuditDataChange,
} from '../../actions/AppManagement/new';
import { getAppEntityListPath } from '../../core/utils';
import history from '../../history';

const timeout = 32;
export default ({ getState, dispatch }) => next => action => {
  console.info(getState, dispatch, '这里备用');
  const ret = next(action);
  switch (action.type) {
    case CREATE_APP_SUCCESS: {
      const { saveType } = action;
      if (saveType) {
        setTimeout(() => {
          // 点击保存按钮的跳转
          history.push(getAppEntityListPath('app'));
        }, timeout);
      } else {
        setTimeout(() => {
          next(adPosDataChange('appTag', 'appTag', true));
          next(editAdPos());
        });
      }
      break;
    }
    case CREATE_APP_FAIL: {
      const { error } = action;
      if (error.code === 409) {
        message.error('应用名称重复');
      }
      // 需要删掉
      const { saveType } = action; // 需要删掉
      if (saveType) {
        setTimeout(() => {
          // 点击保存按钮的跳转
          history.push(getAppEntityListPath('app'));
        }, timeout);
      } else {
        setTimeout(() => {
          next(adPosDataChange('appTag', 'appTag', true));
          next(editAdPos());
        });
      }
      break;
    }
    // 需要删掉CREATE_AD_POS_FAIL
    case CREATE_AD_POS_SUCCESS:
    case CREATE_AD_POS_FAIL: {
      const { saveType } = action;
      if (saveType) {
        setTimeout(() => {
          const { appName } = getState().appManagement.entity.adPos.adPosInfo;
          // 点击保存按钮的跳转
          history.push(getAppEntityListPath('adPos', appName));
        }, timeout);
      } else {
        setTimeout(() => {
          next(selfTestDataChange('appTag', 'appTag', true));
          next(selfTestDataChange('adPosTag', 'adPosTag', true));
          next(editSelfTest());
        }, timeout);
      }
      break;
    }
    case SAVE_SELF_TEST: {
      const { saveType } = action;
      if (!saveType) {
        setTimeout(() => {
          next(toAuditDataChange('appTag', 'appTag', true));
          next(toAuditDataChange('adPosTag', 'adPosTag', true));
          next(toAuditDataChange('selfTestTag', 'selfTestTag', true));
          next(editToAudit());
        }, timeout);
      } else {
        setTimeout(() => {
          const { appName } = getState().appManagement.entity.adPos.adPosInfo;
          // 点击保存按钮的跳转
          history.push(getAppEntityListPath('adPos', appName));
        }, timeout);
      }
      break;
    }
    case CREATE_TO_AUDIT_FAIL: //需要删除
    case CREATE_TO_AUDIT_SUCCESS: {
      const { appName } = getState().appManagement.entity.adPos.adPosInfo;
      setTimeout(() => {
        // 成功后的跳转
        history.push(getAppEntityListPath('adPos', appName));
      }, timeout);
      break;
    }
    case GO_TO_APP_LIST: {
      const { tabType, appName } = action.payload;
      history.push(getAppEntityListPath(tabType, appName));
      break;
    }
    default:
  }
  return ret;
};
