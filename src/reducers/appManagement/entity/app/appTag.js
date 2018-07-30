import {
  // APP_ITEM_CHANGE,
  CREATE_APP_SUCCESS,
  RESET_APP_ITEM,
} from '../../../../constants';

const apptag = (state = false, { type }) => {
  switch (type) {
    // case APP_ITEM_CHANGE: { // 这里对应的是beforeEnter里面设置的
    //   const { type: subType } = payload;
    //   if (subType === 'appTag') {
    //     return payload.appTag;
    //   }
    //   return state;
    // }
    case CREATE_APP_SUCCESS:
      return true;
    case RESET_APP_ITEM:
      return false;
    default:
      return state;
  }
};

export default apptag;
