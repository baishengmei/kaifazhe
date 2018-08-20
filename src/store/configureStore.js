import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { name, version } from '../../package.json';
import rootReducer from '../reducers';
// import createHelpers from './createHelpers';
import createLogger from './logger';
import api from '../middlewares/api';
import httpClient from '../core/HttpClient';
import newAppManagement from '../middlewares/chunk/newAppManagement';

export default function configureStore(initialState) {
  // const helpers = createHelpers(helpersConfig);
  // const middleware = [thunk.withExtraArgument(helpers)];
  const middleware = [thunk];

  let enhancer;

  // 在这里添加各路中间件
  middleware.push(api(httpClient));
  middleware.push(newAppManagement);

  if (__DEV__) {
    middleware.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#14-using-in-production
    const composeEnhancers = composeWithDevTools({
      // Options: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#options
      name: `${name}@${version}`,
    });

    // https://redux.js.org/docs/api/applyMiddleware.html
    enhancer = composeEnhancers(applyMiddleware(...middleware));
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  // https://redux.js.org/docs/api/createStore.html
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers').default),
    );
  }

  return store;
}
