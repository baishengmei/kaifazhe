import {
  EDITING_APP,
  RESET_APP_ITEM,
  CREATE_APP,
  CREATE_APP_SUCCESS,
  CREATE_APP_FAIL,
} from '../../../../constants';
import { OperationStatus } from '../../../../constants/MenuTypes';

const status = (state = OperationStatus.initial, { type }) => {
  switch (type) {
    // case FETCH_ADCAMPAIGN_FORM_DATA:
    //   return OperationStatus.loading;
    // case FETCH_ADCAMPAIGN_FORM_DATA_SUCCESS:
    //   return OperationStatus.load_success;
    // case FETCH_ADCAMPAIGN_FORM_DATA_FAIL:
    //   return OperationStatus.load_fail;
    case EDITING_APP:
      return OperationStatus.editing;
    case CREATE_APP:
      // case UPDATE_ADCAMPAIGN:
      return OperationStatus.saving;
    case CREATE_APP_SUCCESS:
      // case UPDATE_ADCAMPAIGN_SUCCESS:
      return OperationStatus.save_success;
    case CREATE_APP_FAIL:
      // case UPDATE_ADCAMPAIGN_FAIL:
      return OperationStatus.save_success; //这里最后要改成save_fail
    case RESET_APP_ITEM:
      return OperationStatus.initial;
    default:
      return state;
  }
};

export default status;
