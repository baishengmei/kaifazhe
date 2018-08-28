import {
  AdPosObject,
  NewAdPosSettingItems,
} from '../../../../constants/MenuTypes';
// import { ADPOS_ITEM_CHANGE, RESET_ADPOS_ITEM } from '../../../../constants';
import {
  ADPOS_ITEM_CHANGE,
  CREATE_AD_POS_SUCCESS,
  CREATE_APP_SUCCESS,
} from '../../../../constants';

const initialState = {
  appName: '有道词典', // 应用名称 默认应该为‘’，最后需要修改
  appId: -1,
  adPosId: -1,
  adPosName: '', // 广告位名称
  adPosType: AdPosObject[1].value, // 广告位类型，默认：信息流
  callBackUrl: '', // 回调地址
  nameConflict: false,
};

const adPosInfo = (state = initialState, { type, payload }) => {
  // console.info(error, '这里之后会用到的，error');
  // if (type === CREATE_APP_FAIL) {
  //   if (error instanceof Error && 'code' in error && error.code === 409) {
  //     return {
  //       ...state,
  //       nameConflict: true,
  //     };
  //   }
  //   return {
  //     ...state,
  //     nameConflict: false,
  //   };
  // }
  if (type === ADPOS_ITEM_CHANGE) {
    const { type: sectionType, itemType } = payload;
    if (sectionType === NewAdPosSettingItems[0].value) {
      switch (itemType) {
        case 'adPosType':
        case 'callBackUrl':
          // case 'androidPackage':
          return {
            ...state,
            [itemType]: payload[itemType],
          };
        case 'adPosName':
          return {
            ...state,
            // nameConflict: false,
            adPosName: payload.adPosName,
          };
        default:
      }
    }
  } else if (type === CREATE_AD_POS_SUCCESS) {
    return {
      ...state,
      adPosId: payload.adPosId,
    };
  } else if (type === CREATE_APP_SUCCESS) {
    return {
      ...state,
      appId: payload.appId,
    };
  }
  return state;
};

export default adPosInfo;
