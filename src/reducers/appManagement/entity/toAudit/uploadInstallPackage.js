import {
  AdPosObject,
  NewAdPosSettingItems,
} from '../../../../constants/MenuTypes';
// import { ADPOS_ITEM_CHANGE, RESET_ADPOS_ITEM } from '../../../../constants';
import { ADPOS_ITEM_CHANGE } from '../../../../constants';

const initialState = {
  installPackage: {
    name: '秀秀',
    id: 0,
    value: '',
    valid: false,
  },
};

const UploadInstallPackage = (
  state = initialState,
  { type, payload, error },
) => {
  if (type === ADPOS_ITEM_CHANGE) {
    const { type: sectionType, itemType } = payload;
    if (sectionType === NewAdPosSettingItems[1].value) {
      switch (itemType) {
        // case 'installPackage':
        //   // case 'androidPackage':
        //   return {
        //     ...state,
        //     [itemType]: payload[itemType],
        //   };
        default:
      }
    }
  }
  return state;
};

export default UploadInstallPackage;
