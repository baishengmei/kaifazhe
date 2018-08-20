import {
  // ADPOS_ITEM_CHANGE,
  // CREATE_ADPOS_SUCCESS,
  // RESET_ADPOS_ITEM,、
  CREATE_AD_POS_SUCCESS,
  CREATE_AD_POS_FAIL,
} from '../../../../constants';

const adPosTag = (state = false, { type }) => {
  switch (type) {
    // case ADPOS_ITEM_CHANGE: {
    //   const { type: subType } = payload;
    //   if (subType === 'adPosTag') {
    //     return payload.adPosTag;
    //   }
    //   return state;
    // }
    // case CREATE_ADPOS_SUCCESS:
    //   return payload.adPosTag;
    // case RESET_ADPOS_ITEM:
    //   return -1;
    case CREATE_AD_POS_SUCCESS:
      return true;
    case CREATE_AD_POS_FAIL: // 之后需要删掉，这里因为node 接口不同测试用
      return true;
    default:
      return state;
  }
};

export default adPosTag;
