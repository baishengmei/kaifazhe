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
