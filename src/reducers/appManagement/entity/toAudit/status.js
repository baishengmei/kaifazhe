import { OperationStatus } from '../../../../constants/MenuTypes';
import {
  EDITING_TO_AUDIT,
  SAVE_SELF_TEST,
  CREATE_TO_AUDIT,
  CREATE_TO_AUDIT_SUCCESS,
  CREATE_TO_AUDIT_FAIL,
} from '../../../../constants';

const status = (state = OperationStatus.initial, { type }) => {
  switch (type) {
    case EDITING_TO_AUDIT:
      return OperationStatus.editing;
    case SAVE_SELF_TEST:
      return OperationStatus.initial;
    case CREATE_TO_AUDIT:
      return OperationStatus.saving;
    case CREATE_TO_AUDIT_SUCCESS:
      return OperationStatus.save_success;
    case CREATE_TO_AUDIT_FAIL: //之后需要删除
      return OperationStatus.save_success;
    default:
      return state;
  }
};

export default status;
