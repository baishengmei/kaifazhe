import api from './apiDefOfBE';
import http from '../../core/HttpServer';

export const getAdStats = (accessId, params, timeout, data) =>
  http.get(api.adStats, {
    accessId,
    params,
    timeout,
    query: {
      timePeroidType: 'range',
      beginDateField: data.dateRange[0],
      endDateField: data.dateRange[1],
    },
  });

// 可删除
export const getRegionList = (accessId, params, timeout, data) =>
  http.get(api.regionList, {
    accessId,
    params,
    timeout,
    query: {
      keyword: data.keyword,
    },
  });
