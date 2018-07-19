import moment from 'moment';
import 'moment/locale/zh-cn';
import {
  AppTabTypes,
  AppAdposStatus,
  AppOsTypes,
  AdPosAuditStatus,
  AdPosObject,
  PageSizeOptions,
} from '../../../constants/MenuTypes';
import {
  QUERY_CONDITION_CHANGE,
  RESET_QUERY_CONDITION,
  RESET_APP,
  RESET_ADPOS,
} from '../../../constants';

moment.locale('zh-cn');

const getSingleInitialState = type => {
  const today = moment();
  const initialState = {
    dateRange: {
      startDate: today,
      endDate: today,
    },
    keyword: '',
    pageSize: PageSizeOptions[0] - 0,
    pageNo: 1,
  };

  switch (type) {
    case AppTabTypes.appTab:
      initialState.selectedStatus = AppAdposStatus[0]; // 应用列表页 状态
      initialState.selectedOsType = AppOsTypes[0]; // 应用列表页 平台
      break;
    case AppTabTypes.adPosTab:
    case AppTabTypes.appAdPosTab:
      initialState.selectedOperateStatus = AppAdposStatus[0]; // 广告位列表页 操作状态
      initialState.selectedAuditStatus = AdPosAuditStatus[0]; // 广告位列表页 审核状态
      initialState.selectedObject = AdPosObject[0]; // 广告位列表页 广告位类型
      break;
    default:
  }
  return initialState;
};

const getInitialState = () => {
  const initialState = {};
  Object.keys(AppTabTypes).forEach(k => {
    initialState[k] = getSingleInitialState(k);
  });
  return initialState;
};

const queryCondition = (
  state = getInitialState(),
  { type, subType, payload },
) => {
  if (type === QUERY_CONDITION_CHANGE) {
    switch (payload.type) {
      case 'dateRange':
      case 'keyword':
      case 'selectedOsType':
      case 'selectedStatus':
      case 'pageSize':
      case 'selectedAuditStatus':
      case 'selectedObject':
      case 'selectedOperateStatus':
        return {
          ...state,
          [subType]: {
            ...state[subType],
            [payload.type]: payload[payload.type],
            pageNo: 1,
          },
        };
      case 'pageNo':
        return {
          ...state,
          [subType]: {
            ...state[subType],
            pageNo: payload.pageNo,
          },
        };
      default:
    }
  } else if (type === RESET_QUERY_CONDITION) {
    return getInitialState();
  } else if (type === RESET_APP || type === RESET_ADPOS) {
    return {
      ...state,
      appAdPosTab: {
        dateRange: {
          startDate: moment(),
          endDate: moment(),
        },
        keyword: '',
        pageNo: 1,
        pageSize: 10,
        selectedOperateStatus: AppAdposStatus[0],
        selectedAuditStatus: AdPosAuditStatus[0],
        selectedObject: AdPosObject[0],
      },
      appTab: {
        dateRange: {
          startDate: moment(),
          endDate: moment(),
        },
        keyword: '',
        pageNo: 1,
        pageSize: 10,
        selectedOsType: AppOsTypes[0],
        selectedStatus: AppAdposStatus[0],
      },
      adPosTab: {
        dateRange: {
          startDate: moment(),
          endDate: moment(),
        },
        keyword: '',
        pageNo: 1,
        pageSize: 10,
        selectedOperateStatus: AppAdposStatus[0],
        selectedAuditStatus: AdPosAuditStatus[0],
        selectedObject: AdPosObject[0],
      },
    };
  }
  return state;
};

export default queryCondition;
