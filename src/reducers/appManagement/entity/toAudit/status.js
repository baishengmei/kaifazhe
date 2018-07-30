import { OperationStatus } from '../../../../constants/MenuTypes';
import { EDITING_TO_AUDIT } from '../../../../constants';

const status = (state = OperationStatus.initial, { type }) => {
  switch (type) {
    case EDITING_TO_AUDIT:
      return OperationStatus.editing;
    default:
      return state;
  }
};

export default status;
