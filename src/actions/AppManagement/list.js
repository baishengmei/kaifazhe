import {
  GET_APP_AND_ADPOS_LIST,
  GET_APP_AND_ADPOS_LIST_SUCCESS,
  GET_APP_AND_ADPOS_LIST_FAIL,
  QUERY_CONDITION_CHANGE,
  ON_TAB_CHANGE,
  UPDATE_APP_STATUS,
  UPDATE_APP_STATUS_SUCCESS,
  UPDATE_APP_STATUS_FAIL,
  UPDATE_ADPOS_STATUS,
  UPDATE_ADPOS_STATUS_SUCCESS,
  UPDATE_ADPOS_STATUS_FAIL,
} from '../../constants';
import { AppTabTypes } from '../../constants/MenuTypes';

export const getAppAndAdposList = (subType, appId) => (dispatch, getState) => {
  const {
    keyword,
    pageNo,
    pageSize,
    selectedOsType,
    selectedStatus,
    selectedOperateStatus,
    selectedAuditStatus,
    selectedObject,
  } = getState().appManagement.list.queryConditions[subType];
  // console.info(selectedAuditStatus, selectedObject, '打印action中的值');
  const { tabType } = getState().appManagement.list.navTab;
  const query =
    subType === AppTabTypes.appTab
      ? {
          tabType,
          keyword,
          pageNo,
          pageSize,
          appId,
          OsType: selectedOsType.value,
          appStatus: selectedStatus.value,
        }
      : {
          tabType,
          keyword,
          pageNo,
          pageSize,
          appId,
          operateStatus: selectedOperateStatus.value,
          auditStatus: selectedAuditStatus.value,
          object: selectedObject.value,
        };

  return dispatch({
    types: [
      GET_APP_AND_ADPOS_LIST,
      GET_APP_AND_ADPOS_LIST_SUCCESS,
      GET_APP_AND_ADPOS_LIST_FAIL,
    ],
    type: GET_APP_AND_ADPOS_LIST,
    subType,
    promise: http => http.get('/api/adManagement/queryAdEntityList', { query }),
  });
  // return dispatch({
  //   type: GET_APP_AND_ADPOS_LIST,
  //   subType,
  // });
};

// 应用管理列表页 queryCondition改变时，比如日期、页码、平台、审核状态、搜索等 目前未用到
export const appAndAdposListQueryConditionChange = (subType, payload) => ({
  type: QUERY_CONDITION_CHANGE,
  subType,
  payload,
});

// 应用管理页 导航切换，或者点击列表中应用
export const onTabChange = subType => ({
  type: ON_TAB_CHANGE,
  subType,
});

// 批量修改应用状态
export const updateAppStatus = (tabType, appIdList, status) => ({
  types: [UPDATE_APP_STATUS, UPDATE_APP_STATUS_SUCCESS, UPDATE_APP_STATUS_FAIL],
  params: {
    tabType,
    idList: appIdList,
    status,
  },
  promise: http =>
    http.put('/api/adManagement/adCampaigns/status', {
      data: {
        appIds: appIdList.join(','),
        status,
      },
    }),
});

// 批量修改广告位状态
export const updateAdPosStatus = (tabType, adPosList, status) => ({
  types: [
    UPDATE_ADPOS_STATUS,
    UPDATE_ADPOS_STATUS_SUCCESS,
    UPDATE_ADPOS_STATUS_FAIL,
  ],
  params: {
    tabType,
    idList: adPosList,
    status,
  },
  promise: http =>
    http.put('/api/adManagement/adGroups/status', {
      data: {
        adPosIds: adPosList.join(','),
        status,
      },
    }),
});
