import { OperationStatus } from '../../../../constants/MenuTypes';
import {
  EDITING_ADPOS,
  CREATE_APP_SUCCESS,
  CREATE_APP_FAIL,
  CREATE_AD_POS,
  CREATE_AD_POS_SUCCESS,
  CREATE_AD_POS_FAIL,
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
    case CREATE_AD_POS:
      // case UPDATE_ADCAMPAIGN:
      return OperationStatus.saving;
    case CREATE_AD_POS_SUCCESS:
      // case UPDATE_ADCAMPAIGN_SUCCESS:
      return OperationStatus.save_success;
    case CREATE_AD_POS_FAIL:
      // case UPDATE_ADCAMPAIGN_FAIL:
      return OperationStatus.save_success; //这里最后要改成save_fail
    default:
      return state;
  }
};

export default status;
