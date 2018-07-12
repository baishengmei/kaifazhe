import { combineReducers } from 'redux';
import list from './list';
import entity from './entity';

const appManagement = combineReducers({
  list,
  entity,
});

export default appManagement;
