import { SELF_TEST_DATA_CHANGE } from '../../../../constants';

const selfTestTag = (state = false, { type, payload }) => {
  switch (type) {
    case SELF_TEST_DATA_CHANGE: {
      const { type: subType } = payload;
      if (subType === 'appTag') {
        return payload.appTag;
      }
      return state;
    }
    default:
      return state;
  }
};

export default selfTestTag;
