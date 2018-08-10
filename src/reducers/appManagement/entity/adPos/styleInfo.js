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
} from '../../../../constants/MenuTypes';
import {
  CREATE_APP,
  ADPOS_ADD_ELEM,
  ADD_OR_DEL_STYLE,
} from '../../../../constants';
// import { ADPOS_ITEM_CHANGE, RESET_ADPOS_ITEM } from '../../../../constants';
const defaultStyle = defaultElemsInfo.小图;

const initialState = [defaultStyleInfo(defaultStyle)];

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
