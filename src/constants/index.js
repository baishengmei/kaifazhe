/* eslint-disable import/prefer-default-export */

export const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';

/**
 * logout action
 */
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

/**
 * 可删除
 */
export const GO_TO_LOGIN_PAGE = 'GO_TO_LOGIN_PAGE';

// ===================================================应用管理页==================================================//
/**
 * 应用管理 获取应用或广告位列表页表格数据
 */
export const GET_APP_AND_ADPOS_LIST = 'GET_APP_AND_ADPOS_LIST';
export const GET_APP_AND_ADPOS_LIST_SUCCESS = 'GET_APP_AND_ADPOS_LIST_SUCCESS';
export const GET_APP_AND_ADPOS_LIST_FAIL = 'GET_APP_AND_ADPOS_LIST_FAIL';

/**
 * 列表页导航切换，或者点击列表中应用
 */
export const ON_TAB_CHANGE = 'ON_TAB_CHANGE';

/**
 * 列表页条件改变时
 */
export const QUERY_CONDITION_CHANGE = 'QUERY_CONDITION_CHANGE';

/**
 * 列表页重置 暂时的，如果用到哪一个，单独添加注释，未用到的最后删除
 */
export const RESET_QUERY_CONDITION = 'RESET_QUERY_CONDITION';
export const RESET_APP = 'RESET_APP';
export const RESET_ADPOS = 'RESET_ADPOS';

/**
 * 批量操作应用状态
 */
export const UPDATE_APP_STATUS = 'UPDATE_APP_STATUS';
export const UPDATE_APP_STATUS_SUCCESS = 'UPDATE_APP_STATUS_SUCCESS';
export const UPDATE_APP_STATUS_FAIL = 'UPDATE_APP_STATUS_FAIL';

/**
 * 批量操作广告位状态
 */
export const UPDATE_ADPOS_STATUS = 'UPDATE_ADPOS_STATUS';
export const UPDATE_ADPOS_STATUS_SUCCESS = 'UPDATE_ADPOS_STATUS_SUCCESS';
export const UPDATE_ADPOS_STATUS_FAIL = 'UPDATE_ADPOS_STATUS_SUCCESS';

/**
 * 修改广告位列表页样式状态
 */
export const UPDATE_ADPOS_STYLE_STATUS = 'UPDATE_ADPOS_STYLE_STATUS';
export const UPDATE_ADPOS_STYLE_STATUS_SUCCESS =
  'UPDATE_ADPOS_STYLE_STATUS_SUCCESS';
export const UPDATE_ADPOS_STYLE_STATUS_FAIL = 'UPDATE_ADPOS_STYLE_STATUS_FAIL';

/**
 * 正在编辑应用、广告位、自测设备、审核页面
 */
export const EDITING_APP = 'EDITING_APP';
export const EDITING_ADPOS = 'EDITING_ADPOS';
export const EDITING_SELF_TEST = 'EDITING_SELF_TEST';
export const EDITING_TO_AUDIT = 'EDITING_TO_AUDIT';

/**
 * 新建应用页面，表单数据改变
 */
export const APP_ITEM_CHANGE = 'APP_ITEM_CHANGE';

/**
 * 重置新建应用页
 */
export const RESET_APP_ITEM = 'RESET_APP_ITEM';

/**
 * 保存新建应用
 */
export const CREATE_APP = 'CREATE_APP';
export const CREATE_APP_SUCCESS = 'CREATE_APP_SUCCESS';
export const CREATE_APP_FAIL = 'CREATE_APP_FAIL';

/**
 * 新建广告位页，添加样式元素
 */
export const ADPOS_ADD_ELEM = 'ADPOS_ADD_ELEM';
