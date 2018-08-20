import { OperationStatus } from '../../../../constants/MenuTypes';
import {
  EDITING_SELF_TEST,
  CREATE_AD_POS_SUCCESS,
  CREATE_AD_POS_FAIL,
} from '../../../../constants';

const status = (state = OperationStatus.initial, { type }) => {
  switch (type) {
    case EDITING_SELF_TEST:
      return OperationStatus.editing;
    case CREATE_AD_POS_SUCCESS:
      return OperationStatus.initial;
    case CREATE_AD_POS_FAIL: // 这里之后要删掉的
      return OperationStatus.initial;
    default:
      return state;
  }
};

export default status;
