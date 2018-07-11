/* ensure request has referrer */
import { nodeHost } from '../config';

// production 环境限制 referer
// 开发模式不限制
const checkReferer = process.env.NODE_ENV === 'production';

const matchRefererPattern = pattern => {
  const re = new RegExp(`https?:\\/\\/${pattern}\\/`);

  return req => {
    const referer = req.headers.referer || req.headers.referrer;
    return referer ? re.test(referer) : false;
  };
};

const refererMatcher = matchRefererPattern(nodeHost);
const ensureReferer = req => (checkReferer ? refererMatcher(req) : true);

export { ensureReferer as default, matchRefererPattern };
