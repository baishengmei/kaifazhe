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
      screenShot: [
        {
          name: '图片1',
          id: 0,
          value: '',
          valid: false,
        },
      ],
    },
    {
      styleName: '样式2',
      styleStatus: '草稿',
      screenShot: [
        {
          name: '图片2',
          id: '01',
          value: '',
          valid: false,
        },
      ],
    },
    {
      styleName: '样式3',
      styleStatus: '草稿',
      screenShot: [
        {
          name: '图片4',
          id: '001',
          value: '',
          valid: false,
        },
        {
          name: '图片3',
          id: '002',
          value: '',
          valid: false,
        },
        {
          name: '图片5',
          id: '003',
          value: '',
          valid: false,
        },
        {
          name: '图片6',
          id: '004',
          value: '',
          valid: false,
        },
      ],
    },
  ],
};

const uploadScreenShot = (state = initialState, { type, payload, error }) => {
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

export default uploadScreenShot;
