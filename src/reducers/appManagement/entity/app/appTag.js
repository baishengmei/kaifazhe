import {
  APP_ITEM_CHANGE,
  CREATE_APP_SUCCESS,
  RESET_APP_ITEM,
  CREATE_APP_FAIL,
} from '../../../../constants';

const apptag = (state = false, { type, payload }) => {
  switch (type) {
    case APP_ITEM_CHANGE: {
      const { type: subType } = payload;
      if (subType === 'appTag') {
        return payload.appTag;
      }
      return state;
    }
    case CREATE_APP_SUCCESS:
      return true;
    case CREATE_APP_FAIL: // 之后需要删掉，这里因为node 接口不同测试用
      return true;
    case RESET_APP_ITEM:
      return false;
    default:
      return state;
  }
};

export default apptag;
