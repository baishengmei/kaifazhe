import NodeError from '../core/fetch/node-error';

const notFoundRes = {
  status: 404,
  content: {
    errcode: 404,
    errmsg: '访问的资源不存在!',
  },
};

const invalidParamsRes = {
  content: {
    errcode: 400,
    errmsg: '请求参数不正确！',
  },
};

const tryCatch = (fn, ...args) => async (req, res, next) => {
  try {
    const ret = await fn.call(undefined, req, ...args);

    const {
      status = 200,
      content: { errcode = 0, errmsg = '', resData, filename },
    } = ret;

    if (ret === invalidParamsRes) {
      throw new NodeError(
        errmsg,
        'RequestError',
        'invalid-params',
        'frontend',
        errcode,
      );
    } else if (ret === notFoundRes) {
      throw new NodeError(
        errmsg,
        'RequestError',
        'not-found',
        'frontend',
        errcode,
      );
    }

    if (resData && '_headers' in resData) {
      // 去掉内部使用的 java 响应的头设置
      delete resData._headers; // eslint-disable-line
    }

    if (resData && filename) {
      res
        .status(200)
        .attachment(filename)
        .send(resData);
    } else {
      res.status(status).json({
        errcode,
        errmsg,
        resData,
      });
    }
  } catch (err) {
    next(err);
  }
};

export { tryCatch, notFoundRes, invalidParamsRes };
