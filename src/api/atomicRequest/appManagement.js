import api from './apiDefOfBE';
import http from '../../core/HttpServer';

export const uploadAdContentImageReducer = (accessId, params, timeout, data) =>
  http.get(api.uploadAdContentImage, {
    accessId,
    params,
    timeout,
    data: {
      elementId: data.imageId,
      adContentId: data.adContentId,
      adGroupId: data.adGroupId,
      imageName: data.imageName,
      fileData: data.base64,
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
