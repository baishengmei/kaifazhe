import { TO_AUDIT_DATA_CHANGE } from '../../../../constants';

const appTag = (state = false, { type, payload }) => {
  switch (type) {
    case TO_AUDIT_DATA_CHANGE: {
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

export default appTag;
