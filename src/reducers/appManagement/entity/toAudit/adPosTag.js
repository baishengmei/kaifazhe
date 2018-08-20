import { TO_AUDIT_DATA_CHANGE } from '../../../../constants';

const adPosTag = (state = false, { type, payload }) => {
  switch (type) {
    case TO_AUDIT_DATA_CHANGE: {
      const { type: subType } = payload;
      if (subType === 'adPosTag') {
        return payload.adPosTag;
      }
      return state;
    }
    default:
      return state;
  }
};

export default adPosTag;
