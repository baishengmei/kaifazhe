// import {
//   ADPOS_ITEM_CHANGE,
//   CREATE_ADPOS_SUCCESS,
//   RESET_ADPOS_ITEM,
// } from '../../../../../constants';

const adPosTag = (state = false, { type }) => {
  switch (type) {
    // case ADPOS_ITEM_CHANGE: {
    //   const { type: subType } = payload;
    //   if (subType === 'adPosTag') {
    //     return payload.adPosTag;
    //   }
    //   return state;
    // }
    // case CREATE_ADPOS_SUCCESS:
    //   return payload.adPosTag;
    // case RESET_ADPOS_ITEM:
    //   return -1;
    default:
      return state;
  }
};

export default adPosTag;
