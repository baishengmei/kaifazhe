import { OperationStatus } from '../../../../constants/MenuTypes';
import {
  EDITING_ADPOS,
  CREATE_APP_SUCCESS,
  CREATE_APP_FAIL,
} from '../../../../constants';

const status = (state = OperationStatus.initial, { type }) => {
  switch (type) {
    case EDITING_ADPOS:
      return OperationStatus.editing;
    case CREATE_APP_SUCCESS:
      // case UPDATE_ADCAMPAIGN_SUCCESS:
      return OperationStatus.editing;
    case CREATE_APP_FAIL: //这里最后要删掉
      return OperationStatus.editing;
    default:
      return state;
  }
};

export default status;
