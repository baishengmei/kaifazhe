/* ensure api request login and has referrer */
import ensureReferer from '../core/refererMatch';
import { loginPage } from './links';
import config from '../config';

/**
 * ensure server request login
 */
const server = (req, res, next) => {
  if (req.cookies && req.cookies.XZHTK && req.cookies.UID) {
    next();
  } else if (req.cookies && process.env.NODE_ENV !== 'production') {
    res.setHeader('Set-Cookie', [
      `XZHTK=${config.testUser.token}`,
      `UID=${config.testUser.sponsorId}`,
      `XZXEMAIL=${config.testUser.email}`,
    ]);
    next();
  } else {
    res.redirect(loginPage);
  }
};

const api = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const cookieAge = 1 * 60 * 60 * 1000;

  if (!req.cookies || !req.cookies.XZHTK || !req.cookies.UID) {
    if (req.cookies && process.env.NODE_ENV !== 'production') {
      res.setHeader('Set-Cookie', [
        `XZHTK=${config.testUser.token}`,
        `UID=${config.testUser.sponsorId}`,
        `XZXEMAIL=${config.testUser.email}`,
        `USERIP=${ip}`,
      ]);

      return next();
    }
    res.status(403).send({
      errcode: 403,
      errmsg: '未登录或登录超时，请重新登录',
      data: {
        redirect: loginPage,
      },
    });
  } else if (!ensureReferer(req)) {
    // prevent csrf
    res.status(403).send({
      errcode: 403,
      errmsg: 'Referer 错误，请确保浏览器使用的是非隐身模式浏览本站点。',
    });
  } else {
    if (!req.cookies.USERIP || req.cookies.USERIP !== ip) {
      res.setHeader(
        'Set-Cookie',
        [`USERIP=${ip}`],
        'Secure',
        `Max-Age=${cookieAge}`,
      );
    }
    next();
  }
  return true;
};

export default {
  server,
  api,
};
