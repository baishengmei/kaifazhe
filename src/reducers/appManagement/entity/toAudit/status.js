import { OperationStatus } from '../../../../constants/MenuTypes';
import { EDITING_TO_AUDIT, SAVE_SELF_TEST } from '../../../../constants';

const status = (state = OperationStatus.initial, { type }) => {
  switch (type) {
    case EDITING_TO_AUDIT:
      return OperationStatus.editing;
    case SAVE_SELF_TEST:
      return OperationStatus.initial;
    default:
      return state;
  }
};

export default status;
