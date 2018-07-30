import { OperationStatus } from '../../../../constants/MenuTypes';
import { EDITING_SELF_TEST } from '../../../../constants';

const status = (state = OperationStatus.initial, { type }) => {
  switch (type) {
    case EDITING_SELF_TEST:
      return OperationStatus.editing;
    default:
      return state;
  }
};

export default status;
