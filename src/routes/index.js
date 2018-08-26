/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: new RegExp(`^/(home)?$`),
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      // 比如/app、/2323/adSlot、/adSlot
      path: new RegExp(`^/appManagement/?(([\\s\\S]+/)?adSlot|app)?$`),
      load: () =>
        import(/* webpackChunkName: 'appManagement' */ './appManagement/list'),
    },
    {
      // 比如：/appManagement/app/new、/appManagement/232323/adSlot/new
      path: new RegExp(
        `^/appManagement/(app|([0-9]+)/adSlot|selfTest|toAudit)/new$`,
      ),
      load: () =>
        import(/* webpackChunkName: 'appManagement' */ './appManagement/new'),
    },
    {
      // 比如：/appManagement/232323/adSlot/edit
      path: new RegExp(`^/appManagement/([0-9]+)/adSlot/edit$`),
      load: () =>
        import(/* webpackChunkName: 'appManagement' */ './appManagement/edit'),
    },
    {
      path: new RegExp(`^/dataReport(/app)?`),
      load: () => import(/* webpackChunkName: 'dataReport' */ './dataReport'),
    },
    {
      path: '/helpCenter',
      load: () => import(/* webpackChunkName: 'helpCenter' */ './helpCenter'),
    },
    {
      path: '/accountManagement',
      load: () =>
        import(/* webpackChunkName: 'accountManagement' */ './accountManagement'),
    },

    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || '无标题页'} - 有道智选开发者系统`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
