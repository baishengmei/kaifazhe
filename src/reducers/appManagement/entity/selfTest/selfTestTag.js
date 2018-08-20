import { SELF_TEST_DATA_CHANGE, SAVE_SELF_TEST } from '../../../../constants';

const selfTestTag = (state = false, { type, payload }) => {
  switch (type) {
    case SELF_TEST_DATA_CHANGE: {
      const { type: subType } = payload;
      if (subType === 'selfTestTag') {
        return payload.selfTestTag;
      }
      return state;
    }
    case SAVE_SELF_TEST:
      return true;
    default:
      return state;
  }
};

export default selfTestTag;
