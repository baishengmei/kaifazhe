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
    const { type: sectionType, itemType, itemIndex } = payload;
    const newState = [...state];
    if (sectionType === NewAdPosSettingItems[1].value) {
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
        case 'flowInfoStyleType':
          newState[itemIndex][itemType] = payload[itemType];
          newState[itemIndex].styleName = flowStyleItems.find(
            t => t.value === payload[itemType],
          ).name;
          return newState;
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
