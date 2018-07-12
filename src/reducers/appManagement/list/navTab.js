import { AppTabTypes } from '../../../constants/MenuTypes';
import { GO_TO_APP_ADPOS_LIST } from '../../../constants';

const initialState = {
  tabType: AppTabTypes.appTab,
};

const navTab = (state = initialState, { type, tabItem }) => {
  switch (type) {
    case GO_TO_APP_ADPOS_LIST:
      return {
        tabType: tabItem.key,
      };
    default:
      return state;
  }
};

export default navTab;
