import { TO_AUDIT_DATA_CHANGE } from '../../../../constants';

const toAuditTag = (state = false, { type, payload }) => {
  switch (type) {
    case TO_AUDIT_DATA_CHANGE: {
      const { type: subType } = payload;
      if (subType === 'toAuditTag') {
        return payload.toAuditTag;
      }
      return state;
    }
    default:
      return state;
  }
};

export default toAuditTag;
