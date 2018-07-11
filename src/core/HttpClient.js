import qs from 'query-string';
import fetch from './fetch';
import { filterObject } from './utils';

const Http = Object.create(null);

// 浏览器目前支持的方法
// ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
['get', 'post', 'put', 'delete'].forEach(method => {
  const canSend = method === 'post' || method === 'put' || method === 'delete';

  Http[method] = (path, { data, query, timeout = 5000 } = {}) => {
    let url = path;

    const opts = {
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      credentials: 'include',
      timeout,
      mode: 'same-origin',
      cache: 'no-cache',
    };

    if (query) {
      url += `${url.includes('?') ? '&' : '?'}${qs.stringify(
        filterObject(query, Boolean),
      )}`;
    }

    if (canSend && data) {
      opts.body = qs.stringify(filterObject(data, Boolean));
    }

    console.info(url, 'HttpClient.js中的url');

    return fetch(url, opts)
      .then(res => res.json())
      .then(({ errcode = 0, errmsg, resData }) => {
        // eslint-disable-line no-shadow
        if (errcode !== 0) {
          const err = new Error(errmsg);
          err.code = errcode;
          err.data = resData;
          throw err;
        }
        return resData;
      });
  };
});

export default Http;
