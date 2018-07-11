import onFinished from 'on-finished';
import PrettyError from 'pretty-error';
import logStream from '../core/logStream';
import morgan from '../core/morgan';
import { loginPage } from './links';

const errorLogStream = logStream.error;
const errorMessageMap = {
  400: '请求参数有误',
  403: '请求被拒绝，请检查是否有权限访问该资源',
  404: '访问的资源不存在',
  408: '服务响应超时',
  409: '请求资源已存在',
  500: '服务器内部错误',
};

// pretty error
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

const logError = (accessId, type, innerRequestId, method, url, status, err) => {
  const logtext = `${accessId} [${morgan.accessTime()}] ${type} ${innerRequestId} "${method.toUpperCase()} ${url}" ${status} ${
    err.name
  }(${err.type}) ${err.origin} ${err.code} \`\n${err.stack ||
    err.message}\n\`\n`;
  errorLogStream.write(logtext);
};

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(pe.render(err.stack || err)); // eslint-disable-line no-console
  }
  const url = req.originalUrl || req.url;

  if (res.headersSent) {
    // 已经发送response信息的，需要调用系统默认错误处理方式断开连接
    onFinished(res, () => {
      logError(
        morgan.accessId(req),
        'node',
        '-',
        req.method,
        url,
        res.statusCode,
        err,
      );
    });
    return next(err);
  }

  // 程序内部错误，error 没有 code 字段
  const errorCode = err.code && err.code > 0 ? err.code : 500;
  let statusCode = errorCode < 1000 ? errorCode : errorCode - 2000;
  // http status code 的错误代码不能小于 400
  statusCode = statusCode < 400 ? 500 : statusCode;

  // 不合理的 url express 使用 decodeURIComponent 时
  // 会抛出异常，此时错误为 404
  // https://stackoverflow.com/questions/36125216/express-handling-urierror-failed-to-decode-param/36147121
  if (err instanceof URIError) {
    statusCode = 404;
  }

  logError(morgan.accessId(req), 'node', '-', req.method, url, statusCode, err);

  const originErrMsg = err.message || '服务器内部错误';
  const errmsg =
    statusCode in errorMessageMap ? errorMessageMap[statusCode] : originErrMsg;
  const needLogin =
    statusCode === 403 &&
    (originErrMsg.includes('未登录') || originErrMsg.includes('过期'));

  if (req.accepts('json')) {
    res.status(statusCode).json({
      errcode: statusCode,
      errmsg: needLogin ? '登录已超时，请重新登录。' : errmsg,
      data: needLogin ? { redirect: loginPage } : {},
    });
  } else if (needLogin) {
    res.redirect(loginPage);
  } else {
    res.status(statusCode).send(errmsg);
  }

  // const html = ReactDOM.renderToStaticMarkup(
  //   <Html
  //     title="Internal Server Error"
  //     description={err.message}
  //     // eslint-disable-next-line no-underscore-dangle
  //     styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]}
  //   >
  //     {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
  //   </Html>,
  // );
  // res.status(err.status || 500);
  // res.send(`<!doctype html>${html}`);
  return true;
};

export { errorHandler as default, logError };
