import { combineReducers } from 'redux';
import navTab from './navTab';
import queryConditions from './queryConditions';
import queryLists from './queryLists';

export default combineReducers({
  navTab,
  queryConditions,
  queryLists,
});

// export default list;
