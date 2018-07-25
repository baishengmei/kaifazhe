import { AppTabTypes, OperationStatus } from '../../../constants/MenuTypes';
import {
  GET_APP_AND_ADPOS_LIST,
  GET_APP_AND_ADPOS_LIST_SUCCESS,
  GET_APP_AND_ADPOS_LIST_FAIL,
  UPDATE_APP_STATUS,
  UPDATE_APP_STATUS_SUCCESS,
  UPDATE_APP_STATUS_FAIL,
  UPDATE_ADPOS_STATUS,
  UPDATE_ADPOS_STATUS_SUCCESS,
  UPDATE_ADPOS_STATUS_FAIL,
  UPDATE_ADPOS_STYLE_STATUS,
  UPDATE_ADPOS_STYLE_STATUS_SUCCESS,
  UPDATE_ADPOS_STYLE_STATUS_FAIL,
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
      switch: 'open',
      app: {
        name: '应用x',
        id: 1,
      },
      adPos: {
        name: '广告位1',
        id: 101,
        udid: '101',
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
      style: [
        {
          id: '001',
          name: '小图',
          auditStatus: '草稿',
          switch: 'open',
        },
        {
          id: '002',
          name: '大图',
          auditStatus: '待审核',
          switch: 'open',
        },
        {
          id: '003',
          name: '视频',
          auditStatus: '待审核',
          switch: 'pause',
        },
      ],
    },
    {
      switch: 'open',
      app: {
        name: '应用y',
        id: 2,
      },
      adPos: {
        name: '广告位2',
        id: 102,
        udid: '102',
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
      style: [
        {
          id: '101',
          name: '小图',
          auditStatus: '草稿',
          switch: 'open',
        },
        {
          id: '102',
          name: '大图',
          auditStatus: '待审核',
          switch: 'open',
        },
        {
          id: '103',
          name: '视频',
          auditStatus: '待审核',
          switch: 'pause',
        },
      ],
    },
  ],
};

const initialState = {};
Object.keys(AppTabTypes).forEach(k => {
  initialState[k] = getSingleInitialState();
});

export default function queryLists(
  state = initialState,
  { type, subType, payload, params },
) {
  switch (type) {
    case GET_APP_AND_ADPOS_LIST:
      // return {
      //   ...state,
      //   [subType]: {
      //     ...demoData,
      //   },
      // };
      return state;
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
          status: OperationStatus.load_fail,
        },
      };
    case UPDATE_APP_STATUS:
    case UPDATE_ADPOS_STATUS:
    case UPDATE_ADPOS_STYLE_STATUS: {
      const { tabType: tableType } = params;
      return {
        ...state,
        [tableType]: {
          ...state[tableType],
          status: OperationStatus.saving,
        },
      };
    }
    case UPDATE_APP_STATUS_SUCCESS:
    case UPDATE_ADPOS_STATUS_SUCCESS: {
      //这里调试时，按照FAIL里面修改一下，改成一样的
      const { tabType: tableType, idList, status } = params;
      const { list: tableList } = state[tableType];
      const entityKey = tableType === AppTabTypes.appTab ? 'app' : 'adPos';
      tableList.forEach(t => {
        if (idList.indexOf(t[entityKey].id) > -1) {
          t.switch = status;
          t.style && t.style.forEach(st => (st.switch = status));
        }
      });
      return {
        ...state,
        [tableType]: {
          ...state[tableType],
          list: tableList,
          status: OperationStatus.save_success, // 这里最后调试时要修改为false
        },
      };
    }
    case UPDATE_APP_STATUS_FAIL:
    case UPDATE_ADPOS_STATUS_FAIL: {
      const { tabType: tableType, idList, status } = params;
      const { list: tableList } = state[tableType];
      const entityKey = tableType === AppTabTypes.appTab ? 'app' : 'adPos';
      tableList.forEach(t => {
        if (idList.indexOf(t[entityKey].id) > -1) {
          t.switch = status;
          t.style && t.style.forEach(st => (st.switch = status));
        }
      });
      return {
        ...state,
        [tableType]: {
          ...state[tableType],
          list: tableList,
          status: OperationStatus.save_success, // 这里最后调试时要修改为false
        },
      };
    }
    case UPDATE_ADPOS_STYLE_STATUS_SUCCESS: {
      const { tabType: tableType, adPosUdid, styleId, status } = params;
      const { list: tableList } = state[tableType];
      tableList.forEach(ad => {
        if (ad.adPos.udid == adPosUdid) {
          ad.style.forEach(s => {
            if (s.id === styleId) {
              s.switch = status;
            }
          });
        }
      });
      return {
        ...state,
        [tableType]: {
          ...state[tableType],
          list: tableList,
          status: OperationStatus.save_success,
        },
      };
    }
    case UPDATE_ADPOS_STYLE_STATUS_FAIL: {
      //这里需要修改，
      const { tabType: tableType, adPosUdid, styleId, status } = params;
      const { list: tableList } = state[tableType];
      tableList.forEach(ad => {
        if (ad.adPos.udid == adPosUdid) {
          ad.style.forEach(s => {
            if (s.id === styleId) {
              s.switch = status;
            }
          });
        }
      });
      return {
        ...state,
        [tableType]: {
          ...state[tableType],
          list: tableList,
          status: OperationStatus.save_success,
        },
      };
    }
    default:
      return state;
  }
}

// export default queryLists;
