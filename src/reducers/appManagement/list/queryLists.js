import { AppTabTypes, OperationStatus } from '../../../constants/MenuTypes';
import {
  GET_APP_AND_ADPOS_LIST,
  GET_APP_AND_ADPOS_LIST_SUCCESS,
  GET_APP_AND_ADPOS_LIST_FAIL,
} from '../../../constants';

const getSingleInitialState = () => ({
  status: OperationStatus.initial,
  total: 0,
  list: [],
});

const demoData = {
  status: OperationStatus.load_success,
  total: 2,
  list: [
    {
      switch: 'on',
      app: {
        name: '应用x',
        id: 1,
      },
      adPos: {
        name: '广告位1',
        id: 101,
      },
      adPosType: '开屏',
      auditStatus: '待审核',
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
      app: {
        name: '应用y',
        id: 2,
      },
      adPos: {
        name: '广告位2',
        id: 102,
      },
      adPosType: '开屏',
      auditStatus: '待审核',
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
};

const initialState = {};
Object.keys(AppTabTypes).forEach(k => {
  initialState[k] = getSingleInitialState();
});

const queryLists = (state = initialState, { type, subType, payload }) => {
  switch (type) {
    case GET_APP_AND_ADPOS_LIST:
      return {
        ...state,
        [subType]: {
          ...demoData,
        },
      };
    case GET_APP_AND_ADPOS_LIST_SUCCESS:
      return {
        ...state,
        [subType]: {
          status: OperationStatus.load_success,
          total: payload.total,
          list: payload.list,
        },
      };
    case GET_APP_AND_ADPOS_LIST_FAIL:
      return {
        ...state,
        // [subType]: {
        //   ...state[subType],
        //   status: OperationStatus.load_fail,
        // },
        [subType]: {
          ...demoData,
        },
      };
    default:
      return state;
  }
};

export default queryLists;
