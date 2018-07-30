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
} from '../../constants';
import { isValidAppAdPosEntityName } from '../../core/utils';
import { OperationStatus } from '../../constants/MenuTypes';

// 正在编辑应用、广告位、自测页面、提交审核页面
const editingAppManagementEntity = type => ({ type });
export const editingApp = () => editingAppManagementEntity(EDITING_APP);
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
