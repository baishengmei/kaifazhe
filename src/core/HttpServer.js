/* This is used to send a http request to java service */
import qs from 'querystring';
import FormData from 'form-data';
import fetch from './fetch';
import NodeError from './fetch/node-error';
import morgan from './morgan';
import { filterObject } from './utils';
import { logResponse } from '../middlewares/log';
import { logError } from '../middlewares/errorHandler';

const Http = Object.create(null);

/**
 * post: 新建
 * put: 全量更新
 * patch: 修改个别字段
 */
['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
  const canSend = ['post', 'put', 'patch', 'delete'].includes(method);

  Http[method] = (
    path,
    {
      accessId,
      // 额外的参数，如：
      // 1. path 中需要替换的变量
      // 2. header 里需要附带的 sponsorId 等
      params,
      timeout = 5000,
      query,
      data,
    },
  ) => {
    // eslint-disable-next-line no-param-reassign
    path = path.replace(
      /{([\w]+)}/g,
      (s0, s1) => (s1 in params ? params[s1] : s0),
    );

    const opts = {
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      timeout,
      mode: 'cors',
      cache: 'no-cache',
      // data: JSON.stringify(data),
    };

    if ('sponsorId' in params) {
      opts.headers.sponsorIdHeader = params.sponsorId;
    }

    if ('sessionForBE' in params) {
      opts.headers.cookie = params.sessionForBE;
    }

    if ('token' in params) {
      opts.headers.Authorization = params.token;
    }

    if ('ip' in params) {
      opts.headers['x-forwarded-for'] = params.ip;
    }

    if ('cookie' in params) {
      opts.headers.cookie = params.cookie;
    }

    if (query) {
      path += `?${qs.stringify(filterObject(query, d => d !== undefined))}`; // eslint-disable-line no-param-reassign
    }

    if (canSend && data) {
      opts.body = qs.stringify(filterObject(data, d => d !== undefined));

      if (!('fileData' in data)) {
        // console.log('postData', data);
      }
    }

    if ('uploadFile' in params) {
      const form = new FormData();
      form.append('packageData', params.upload);
      opts.body = form;
      opts.headers['Content-Type'] = form.getHeaders();
    }

    const logData = {
      type: 'java',
      innerRequestId: morgan.innerRequestId(),
      url: `${path}${path.includes('?') ? '&' : '?'}sponsorId=${
        opts.headers.sponsorIdHeader
      }`,
      responseTime: Date.now(),
      ...opts,
    };

    if (accessId) {
      logData.accessId = accessId;
    }

    /* eslint-disable camelcase, no-param-reassign */
    return fetch(path, opts)
      .then(res => {
        console.info(path, opts, res.headers, '顺利的结束了几分');
        console.info(res.headers.get('content-length'), '打印新方法得到的结果');
        const contentLength = res.headers.get('content-length');
        const contentType = res.headers.get('content-type');
        // const expires = res.headers.get('expires');
        // const date = res.headers.get('date:');
        const resHeaders = {
          contentLength,
          contentType,
          // expires,
          // date,
        };
        logData.responseHeaders = resHeaders;
        logData.statusCode = res.status;
        logData.contentLength =
          contentLength && contentLength.length > 0 ? contentLength[0] : '"-"';
        return res;
      })
      .then(res => res.json())
      .then(res => {
        // eslint-disable-next-line no-shadow
        const { error_code, error_message, data } = res;
        if (error_code !== 0) {
          throw new NodeError(
            error_message || JSON.stringify(res),
            'ResponseError',
            'response-message',
            'backend',
            error_code,
          );
        }
        return data || {};
      })
      .catch(err => {
        if (path.length > 1000) {
          console.info('url', `${path.slice(0, 1000)}...`);
        } else {
          console.info('url', path);
        }
        console.info('error', err);
        if (!(err instanceof NodeError)) {
          const { type = '' } = err;
          if (type.includes('timeout')) {
            err = new NodeError(
              `服务器响应超时 (timeout=${opts.timeout}ms)`,
              err.name,
              type,
              'backend',
              408,
            );
          } else {
            err = new NodeError(
              err.message,
              err.name,
              type,
              type === 'system' ? type : 'backend',
            );
          }
        }
        logError(
          accessId,
          err.origin === 'backend' ? 'java' : 'node',
          logData.innerRequestId,
          opts.method,
          logData.url,
          err.code,
          err,
        );
        return err;
      })
      .then(ret => {
        logData.responseTime = Date.now() - logData.responseTime;
        // 为了在返回数据中获取 header
        ret._headers = logData.responseHeaders; // eslint-disable-line no-underscore-dangle

        const isError = ret instanceof NodeError;
        if (isError) {
          logData.statusCode = ret.code;
          logData.contentLength = '-';
        }
        logResponse(logData);
        if (isError) {
          throw ret;
        }
        return ret;
      });
  };
});

Http.getStream = (
  path,
  {
    // accessId,
    timeout = 5000,
  },
) => {
  const opts = {
    method: 'GET',
    timeout,
    mode: 'cors',
  };

  return fetch(path, opts).then(res => res.text());
};

export default Http;
