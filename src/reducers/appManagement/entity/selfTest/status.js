import { OperationStatus } from '../../../../constants/MenuTypes';
import {
  EDITING_SELF_TEST,
  CREATE_AD_POS_SUCCESS,
  CREATE_AD_POS_FAIL,
  SAVE_SELF_TEST,
} from '../../../../constants';

const status = (state = OperationStatus.initial, { type }) => {
  switch (type) {
    case EDITING_SELF_TEST:
      return OperationStatus.editing;
    case CREATE_AD_POS_SUCCESS:
      return OperationStatus.initial;
    case CREATE_AD_POS_FAIL: // 这里之后要删掉的
      return OperationStatus.initial;
    case SAVE_SELF_TEST:
      return OperationStatus.save_success;
    default:
      return state;
  }
};

export default status;
