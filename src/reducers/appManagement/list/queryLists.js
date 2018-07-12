import { AppTabTypes, OperationStatus } from '../../../constants/MenuTypes';

const getSingleInitialState = () => ({
  status: OperationStatus.initial,
  total: 0,
  list: [],
});

const initialState = {};
Object.keys(AppTabTypes).forEach(k => {
  initialState[k] = getSingleInitialState();
});

const queryLists = (state = initialState, { type }) => {
  switch (type) {
    default:
      return state;
  }
};

export default queryLists;
