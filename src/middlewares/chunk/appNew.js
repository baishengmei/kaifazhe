import { message } from 'antd';
import { CREATE_APP_SUCCESS, CREATE_APP_FAIL } from '../../constants';
import { appDataChange, editingApp } from '../../actions/AppManagement/new';

export default ({ getState, dispatch }) => next => action => {
  console.info(getState, dispatch, '这里备用');
  const ret = next(action);
  switch (action.type) {
    case CREATE_APP_SUCCESS: {
      setTimeout(() => {
        next(appDataChange('appTag', 'appTag', true));
        next(editingApp());
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
    default:
  }
  return ret;
};
