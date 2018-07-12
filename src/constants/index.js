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

// ===========================================应用管理页=================================//
/**
 * 应用管理 导航 切换
 */
export const GO_TO_APP_ADPOS_LIST = 'GO_TO_APP_ADPOS_LIST';

/**
 * 列表页条件改变时, 目前还未用到
 */
export const QUERY_CONDITION_CHANGE = 'QUERY_CONDITION_CHANGE';

/**
 * 列表页重置 暂时的，如果用到哪一个，单独添加注释，未用到的最后删除
 */
export const RESET_QUERY_CONDITION = 'RESET_QUERY_CONDITION';
export const RESET_APP = 'RESET_APP';
export const RESET_ADPOS = 'RESET_ADPOS';
