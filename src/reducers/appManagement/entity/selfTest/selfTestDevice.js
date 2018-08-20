import {
  AppOsTypeZH,
  NewAppSettingItems,
} from '../../../../constants/MenuTypes';
import { APP_ITEM_CHANGE, RESET_APP_ITEM } from '../../../../constants';

const initialState = {
  adPosId: '', // 广告位ID
  deviceList: [
    {
      id: 1,
      deviceId: 'FA5BD7AD-2980-404C-B164-09663E881FC7',
      comment: 'Android的备注1',
    },
    {
      id: 2,
      deviceId: 'FA5BD7AD-2980-404C-B164-09663E881FC8',
      comment: 'Android的备注2',
    },
    {
      id: 3,
      deviceId: 'FA5BD7AD-2980-404C-B164-09663E881FC9',
      comment: 'Android的备注3',
    },
    {
      id: 4,
      deviceId: 'FA5BD7AD-2980-404C-B164-09663E881FC1',
      comment: 'Android的备注3',
    },
    {
      id: 5,
      deviceId: 'FA5BD7AD-2980-404C-B164-09663E881FC2',
      comment: 'Android的备注3',
    },
    {
      id: 6,
      deviceId: 'FA5BD7AD-2980-404C-B164-09663E881FC3',
      comment: 'Android的备注3',
    },
    {
      id: 7,
      deviceId: 'FA5BD7AD-2980-404C-B164-09663E881FC4',
      comment: 'Android的备注3',
    },
  ], // 自测设备列表
};

const selfTestDevice = (state = initialState, { type, payload, error }) => {
  // console.info(error, '这里之后会用到的，error');
  if (type === APP_ITEM_CHANGE) {
    const { type: sectionType, itemType } = payload;
    if (sectionType === NewAppSettingItems[0].value) {
      switch (itemType) {
        case 'osType':
        case 'appType':
        case 'androidPackage':
          return {
            ...state,
            [itemType]: payload[itemType],
          };
        case 'appName':
          return {
            ...state,
            nameConflict: false,
            appName: payload.appName,
          };
        default:
      }
    }
  }
  if (type === RESET_APP_ITEM) {
    return initialState;
  }
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

export default selfTestDevice;
