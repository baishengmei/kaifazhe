import {
  flowStyleItems,
  AdPosAuditStatus,
  objectTypeItems,
  pictureElemsMapKey,
  textElemsMapKey,
  videoElemsMapKey,
  styleElemName,
  defaultElemsInfo,
  defaultStyleInfo,
  defaultElemsItems,
  NewAdPosSettingItems,
  restElemsItems,
  AdPosObject,
} from '../../../../constants/MenuTypes';
import {
  CREATE_APP,
  ADPOS_ADD_ELEM,
  ADD_OR_DEL_STYLE,
  ADPOS_ITEM_CHANGE,
} from '../../../../constants';
// import { ADPOS_ITEM_CHANGE, RESET_ADPOS_ITEM } from '../../../../constants';
const defaultStyle = defaultElemsInfo.小图;
const initialState = [defaultStyleInfo(defaultStyle, defaultElemsItems.小图)];

const styleInfo = (state = initialState, { type, payload, error }) => {
  if (type === ADPOS_ADD_ELEM) {
    const { elemType, elemValue, index } = payload;
    const elemTypeIndex = styleElemName.findIndex(t => t === elemType);
    const elemTypeInState =
      elemTypeIndex === 0
        ? 'pictures'
        : elemTypeIndex === 1 ? 'texts' : 'videos';
    const newState = state.map((t, i) => {
      if (i === index) {
        return {
          ...t,
          [elemTypeInState]: [...elemValue],
        };
      }
      return t;
    });
    return newState;
  }
  if (type === ADD_OR_DEL_STYLE) {
    return payload.styleInfo;
  }
  if (type === ADPOS_ITEM_CHANGE) {
    const {
      type: sectionType,
      itemType,
      itemIndex,
      flowInfoStyleType,
    } = payload;
    const newState = [...state];
    if (sectionType === NewAdPosSettingItems[0].value) {
      if (itemType === 'adPosType' && payload[itemType] !== 'infoFlow') {
        let newStyleInfo = {};
        // 广告位类型名称
        const curItemType = AdPosObject.find(t => t.value === payload[itemType])
          .name;
        newStyleInfo.styleName = curItemType;
        newStyleInfo.auditStatus = AdPosAuditStatus[1].name;
        newStyleInfo.objectType = objectTypeItems[0].value;
        newStyleInfo.appVersion = 0;

        // 修改元素为默认项
        const defaultStyle = defaultElemsInfo[curItemType];
        const defaultItems = defaultElemsItems[curItemType];
        newStyleInfo.pictureElems = restElemsItems(
          defaultItems,
          pictureElemsMapKey,
          'pictureElems',
        );
        newStyleInfo.textElems = restElemsItems(
          defaultItems,
          textElemsMapKey,
          'textElems',
        );
        newStyleInfo.videoElems = restElemsItems(
          defaultItems,
          videoElemsMapKey,
          'videoElems',
        );
        Object.keys(defaultStyle).forEach(t => {
          newStyleInfo[t] = defaultStyle[t];
        });
        return [newStyleInfo];
      } else if (itemType === 'adPosType' && payload[itemType] === 'infoFlow') {
        return initialState;
      }
    } else if (sectionType === NewAdPosSettingItems[1].value) {
      switch (itemType) {
        case 'styleName':
        case 'objectType':
        case 'appVersion':
        case 'pictures':
        case 'texts':
        case 'video':
        case 'ratio':
        case 'attr':
          newState[itemIndex][itemType] = payload[itemType];
          return newState;
        case 'flowInfoStyleType': {
          let newStyleInfo = newState[itemIndex]; // 当前样式
          newStyleInfo[itemType] = payload[itemType]; // 添加样式 类型
          // 修改样式名称、推广标的类型、可兼容的最低版本号
          newStyleInfo.styleName = flowStyleItems.find(
            t => t.value === payload[itemType],
          ).name;
          newStyleInfo.auditStatus = AdPosAuditStatus[1].name;
          newStyleInfo.objectType = objectTypeItems[0].value;
          newStyleInfo.appVersion = 0;
          // 样式类型名称，如组图
          const styleTypeName = flowStyleItems.find(
            t => t.value === flowInfoStyleType,
          ).name;
          // 修改元素为默认项
          const defaultStyle = defaultElemsInfo[styleTypeName];
          const defaultItems = defaultElemsItems[styleTypeName];
          newStyleInfo.pictureElems = restElemsItems(
            defaultItems,
            pictureElemsMapKey,
            'pictureElems',
          );
          newStyleInfo.textElems = restElemsItems(
            defaultItems,
            textElemsMapKey,
            'textElems',
          );
          newStyleInfo.videoElems = restElemsItems(
            defaultItems,
            videoElemsMapKey,
            'videoElems',
          );
          Object.keys(defaultStyle).forEach(t => {
            newStyleInfo[t] = defaultStyle[t];
          });
          return newState;
        }
        default:
      }
    }
  }
  // if (type === FLOWINFO_TYPE_CHANGE) {
  //   const { flowInfoType, index } = payload;
  //   const newState = [...state];
  //   newState[index].flowInfoStyleType = flowInfoType;
  //   newState[index].styleName = flowStyleItems.find(
  //     t => t.value === flowInfoType,
  //   ).name;
  //   return newState;
  // }
  // if (type === STYLE_NAME_CHANGE) {
  //   const { styleName, index } = payload;
  //   const newState = [...state];
  //   newState[index].styleName = styleName;
  //   return newState;
  // }
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

export default styleInfo;
