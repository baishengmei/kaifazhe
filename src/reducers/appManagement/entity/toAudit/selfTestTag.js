import { TO_AUDIT_DATA_CHANGE } from '../../../../constants';

const selfTestTag = (state = false, { type, payload }) => {
  switch (type) {
    case TO_AUDIT_DATA_CHANGE: {
      const { type: subType } = payload;
      if (subType === 'selfTestTag') {
        return payload.selfTestTag;
      }
      return state;
    }
    default:
      return state;
  }
};

export default selfTestTag;
