import { AppTabTypes, OperationStatus } from '../../../constants/MenuTypes';

const getSingleInitialState = () => ({
  status: OperationStatus.initial,
  total: 0,
  list: [
    {
      switch: 'on',
      appName: '应用x',
      osType: 'iOS',
      reqAdNum: 230,
      resAdNum: 228,
      fillRate: '99.2%',
      impressionNum: 101,
      impressionRate: '78%',
      clickNum: 10230,
      clickRate: '60%',
      eCPC: '0.7',
      cpc: '0.72',
      estimateProfit: '0.9',
    },
    {
      switch: 'on',
      appName: '应用y',
      osType: 'Android',
      reqAdNum: 130,
      resAdNum: 128,
      fillRate: '89.2%',
      impressionNum: 201,
      impressionRate: '58%',
      clickNum: 60101,
      clickRate: '60%',
      eCPC: '0.7',
      cpc: '0.72',
      estimateProfit: '0.9',
    },
  ],
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
