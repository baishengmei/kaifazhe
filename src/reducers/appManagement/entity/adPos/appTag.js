// import {
//   ADPOS_ITEM_CHANGE,
//   RESET_ADPOS_ITEM,
// } from '../../../../../constants';

const appTag = (state = false, { type }) => {
  switch (type) {
    // case ADPOS_ITEM_CHANGE: {
    //   const { type: subType } = payload;
    //   if (subType === 'appTag') {
    //     return payload.appTag;
    //   }
    //   return state;
    // }
    // case RESET_ADPOS_ITEM:
    //   return -1;
    default:
      return state;
  }
};

export default appTag;
