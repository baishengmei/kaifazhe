import {
  SELF_TEST_DATA_CHANGE,
  // RESET_SELFTEST_ITEM,
} from '../../../../constants';

const adPosTag = (state = false, { type, payload }) => {
  switch (type) {
    case SELF_TEST_DATA_CHANGE: {
      const { type: subType } = payload;
      if (subType === 'adPosTag') {
        return payload.adPosTag;
      }
      return state;
    }
    // case RESET_SELFTEST_ITEM:
    //   return -1;
    default:
      return state;
  }
};

export default adPosTag;
