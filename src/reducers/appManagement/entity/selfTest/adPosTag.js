// import {
//   SELFTEST_ITEM_CHANGE,
//   RESET_SELFTEST_ITEM,
// } from '../../../../../constants';

const adPosTag = (state = false, { type }) => {
  switch (type) {
    // case SELFTEST_ITEM_CHANGE: {
    //   const { type: subType } = payload;
    //   if (subType === 'adPosTag') {
    //     return payload.adPosTag;
    //   }
    //   return state;
    // }
    // case RESET_SELFTEST_ITEM:
    //   return -1;
    default:
      return state;
  }
};

export default adPosTag;
