import {
  AppOsTypeZH,
  NewAppSettingItems,
} from '../../../../constants/MenuTypes';
import { APP_ITEM_CHANGE, RESET_APP_ITEM } from '../../../../constants';

const initialState = {
  appName: '', // 应用名称
  osType: AppOsTypeZH[0].value, // 平台
  nameConflict: false,
  appType: ['一级分类', '二级分类'], // 应用类型
  // 一、二级分类
  categories: [
    {
      name: '生活娱乐',
      id: 1,
      children: [
        {
          name: '生活娱乐子类1',
          id: '101',
        },
        {
          name: '生活娱乐子类2',
          id: '102',
        },
        {
          name: '生活娱乐子类3',
          id: '103',
        },
      ],
    },
    {
      name: '教育',
      id: 2,
      children: [
        {
          name: '数学',
          id: '201',
        },
        {
          name: '语文',
          id: '202',
        },
        {
          name: '英语',
          id: '203',
        },
      ],
    },
  ],
  androidPackage: '', // Android包名
};

const newApp = (state = initialState, { type, payload, error }) => {
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

export default newApp;
