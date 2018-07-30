import { OperationStatus } from '../../../../constants/MenuTypes';
import { EDITING_ADPOS } from '../../../../constants';

const status = (state = OperationStatus.initial, { type }) => {
  switch (type) {
    case EDITING_ADPOS:
      return OperationStatus.editing;
    default:
      return state;
  }
};

export default status;
