import { message } from 'antd';
import { goToLogin } from '../actions/Auth';

const isBrowser =
  typeof window === 'object' &&
  window.document &&
  typeof window.document === 'object';
const getUrlPath = () => (isBrowser ? window.location.pathname : 'isServer');

export default function api(client) {
  return () => next => action => {
    const { promise, types, ...rest } = action;

    if (!promise) {
      return next(action);
    }

    const urlPath1 = getUrlPath();
    const [REQUEST, SUCCESS, FAILURE] = types;

    next({
      ...rest,
      requestUrlPath: urlPath1,
      type: REQUEST,
    });

    promise(client)
      .then(payload => {
        const urlPath2 = getUrlPath();

        try {
          next({
            ...rest,
            payload,
            requestUrlPath: urlPath1,
            currentUrlPath: urlPath2,
            type: SUCCESS,
          });
        } catch (e) {
          console.log(`error in ${SUCCESS}: `, e); // eslint-disable-line no-console
        }
      })
      .catch(error => {
        const urlPath3 = getUrlPath();

        next({
          ...rest,
          error,
          requestUrlPath: urlPath1,
          currentUrlPath: urlPath3,
          type: FAILURE,
        });
        console.info('http error', error);

        if (error.code === 403 && error.data && error.data.redirect) {
          next(
            goToLogin({
              errorMessage: error.message,
              redirect: error.data.redirect,
            }),
          );
        } else if (error.code !== 409) {
          // 409 的 message 有特别显示，在 adList、adEntity 中间件和对应的 reducer 以及页面中处理
          if (urlPath3 === urlPath1) {
            message.error(error.message, 2);
          }
        }
      });
    return true;
  };
}
