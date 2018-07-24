import { AppTabTypes } from '../../../constants/MenuTypes';
import { ON_TAB_CHANGE } from '../../../constants';

const initialState = {
  tabType: AppTabTypes.appTab,
};

export default function navTab(state = initialState, { type, subType }) {
  switch (type) {
    case ON_TAB_CHANGE:
      return {
        ...state,
        tabType: subType,
      };
    default:
      return state;
  }
}

// export default navTab;
