import {
  AdPosObject,
  NewAdPosSettingItems,
} from '../../../../constants/MenuTypes';
// import { ADPOS_ITEM_CHANGE, RESET_ADPOS_ITEM } from '../../../../constants';
import { ADPOS_ITEM_CHANGE } from '../../../../constants';

const initialState = {
  adPosName: '', // 广告位名称
  styleInfo: [
    {
      styleName: '样式1',
      styleStatus: '草稿',
      file: '',
    },
    {
      styleName: '样式2',
      styleStatus: '草稿',
      file: '',
    },
    {
      styleName: '样式3',
      styleStatus: '草稿',
      file: '',
    },
  ],
};

const adPosInfo = (state = initialState, { type, payload, error }) => {
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
  }
  return state;
};

export default adPosInfo;
