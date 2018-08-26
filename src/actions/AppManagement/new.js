import {
  EDITING_APP,
  EDITING_ADPOS,
  EDITING_SELF_TEST,
  EDITING_TO_AUDIT,
  APP_ITEM_CHANGE,
  RESET_APP_ITEM,
  CREATE_APP,
  CREATE_APP_SUCCESS,
  CREATE_APP_FAIL,
  ADPOS_ADD_ELEM,
  ADD_OR_DEL_STYLE,
  ADPOS_ITEM_CHANGE,
  CREATE_AD_POS,
  CREATE_AD_POS_SUCCESS,
  CREATE_AD_POS_FAIL,
  SELF_TEST_DATA_CHANGE,
  SAVE_SELF_TEST,
  TO_AUDIT_DATA_CHANGE,
  CREATE_TO_AUDIT,
  CREATE_TO_AUDIT_SUCCESS,
  CREATE_TO_AUDIT_FAIL,
} from '../../constants';
import { isValidAppAdPosEntityName } from '../../core/utils';
import { OperationStatus } from '../../constants/MenuTypes';

// 正在编辑应用、广告位、自测页面、提交审核页面
const editingAppManagementEntity = type => ({ type });
export const editApp = () => editingAppManagementEntity(EDITING_APP);
export const editAdPos = () => editingAppManagementEntity(EDITING_ADPOS);
export const editSelfTest = () => editingAppManagementEntity(EDITING_SELF_TEST);
export const editToAudit = () => editingAppManagementEntity(EDITING_TO_AUDIT);

// 编辑新建应用页面,表单数据改变
export const appDataChange = (sectionType, itemType, itemValue) => ({
  type: APP_ITEM_CHANGE,
  payload: {
    type: sectionType,
    itemType,
    [itemType]: itemValue,
  },
});

export const resetAppItem = () => ({
  type: RESET_APP_ITEM,
});

export const saveAppData = saveType => (dispatch, getState) => {
  console.info(saveType, '打印当前点击的是 保存 还是 保存并继续');
  const {
    status,
    newApp: { appName, osType, appType, androidPackage },
  } = getState().appManagement.entity.app;

  const validStatus =
    status === OperationStatus.load_success ||
    status === OperationStatus.editing ||
    status === OperationStatus.save_fail;
  const validAppName = isValidAppAdPosEntityName(appName);

  if (!validStatus || !validAppName) return;

  const data = {
    appName: appName.trim(),
    osType,
    appType,
    androidPackage: androidPackage.trim(),
  };

  return dispatch({
    types: [CREATE_APP, CREATE_APP_SUCCESS, CREATE_APP_FAIL],
    promise: http => http.post('/api/adManagement/adCampaign', { data }),
  });
};

export const saveAdPosData = saveType => (dispatch, getState) => {
  console.info(saveType, '打印当前点击的是 保存 还是 保存并继续2');
  const {
    status,
    adPosInfo: { adPosName, adPosType, callBackUrl },
    styleInfo,
  } = getState().appManagement.entity.adPos;
  const validStatus =
    status === OperationStatus.load_success ||
    status === OperationStatus.editing ||
    status === OperationStatus.save_fail;
  const validAdPosName = isValidAppAdPosEntityName(adPosName);
  if (!validStatus || !validAdPosName) return;
  const data = {
    adPosName,
    adPosType,
    callBackUrl,
    styleInfo,
  };
  return dispatch({
    types: [CREATE_AD_POS, CREATE_AD_POS_SUCCESS, CREATE_AD_POS_FAIL],
    promise: http => http.post('/api/adManagement/adCampaign', { data }),
  });
};

// 新增加一个元素，如图片元素、文字元素、视频元素
export const adPosAddElem = (elemType, elemValue, index) => ({
  type: ADPOS_ADD_ELEM,
  payload: {
    elemType,
    elemValue,
    index,
  },
});

// 继续添加样式或者删除样式
export const addOrDelStyle = styleInfo => ({
  type: ADD_OR_DEL_STYLE,
  payload: {
    styleInfo,
  },
});

// 编辑新建广告位页面,表单数据改变
export const adPosDataChange = (
  sectionType,
  itemType,
  itemValue,
  itemIndex,
) => ({
  type: ADPOS_ITEM_CHANGE,
  payload: {
    type: sectionType,
    itemType,
    [itemType]: itemValue,
    itemIndex,
  },
});

// 自测页面改变
export const selfTestDataChange = (sectionType, itemType, itemValue) => ({
  type: SELF_TEST_DATA_CHANGE,
  payload: {
    type: sectionType,
    itemType,
    [itemType]: itemValue,
  },
});

// 保存自测页面
export const saveSelfTestData = saveType => {
  // 保存并继续
  if (saveType === false) {
    return {
      type: SAVE_SELF_TEST,
    };
  }
};

// 自测页面变化
export const toAuditDataChange = (sectionType, itemType, itemValue) => ({
  type: TO_AUDIT_DATA_CHANGE,
  payload: {
    type: sectionType,
    itemType,
    [itemType]: itemValue,
  },
});

export const saveToAuditData = () => (dispatch, getState) => {
  const {
    status,
    uploadScreenShot: { styleInfo },
    uploadInstallPackage: { installPackage },
  } = getState().appManagement.entity.toAudit;
  const validStatus =
    status === OperationStatus.load_success ||
    status === OperationStatus.editing ||
    status === OperationStatus.save_fail;
  if (!validStatus) return;
  const data = {
    styleInfo,
    installPackage,
  };
  return dispatch({
    types: [CREATE_TO_AUDIT, CREATE_TO_AUDIT_SUCCESS, CREATE_TO_AUDIT_FAIL],
    promise: http => http.post('/api/adManagement/adCampaign', { data }),
  });
};
