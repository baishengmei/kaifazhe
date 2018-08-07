import { AdPosObject } from '../../../../constants/MenuTypes';
// import { ADPOS_ITEM_CHANGE, RESET_ADPOS_ITEM } from '../../../../constants';

const initialState = {
  appName: '有道词典', // 应用名称 默认应该为‘’，最后需要修改
  adPosName: '', // 广告位名称
  adPosType: AdPosObject[1].name, // 广告位类型，默认：信息流
  callBackUrl: '', // 回调地址
};

const adPosInfo = (state = initialState, { type, payload, error }) => {
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
  return state;
};

export default adPosInfo;
