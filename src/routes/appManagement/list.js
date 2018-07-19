/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import AppManagement from '../../containers/appManagement/AppManagement';
import {
  onTabChange,
  getAppAndAdposList,
} from '../../actions/AppManagement/list';

const title = '应用管理';

function action(context) {
  const { store, params } = context;

  const subTitle = params['0'] === 'app' ? '应用' : '广告位';
  const appId = params['1'] && params['1'].replace(/(\/)$/, '');
  const subNav =
    params['0'] === 'app' ? 'appTab' : appId ? 'appAdPosTab' : 'adPosTab';

  const component = appId ? (
    <Layout>
      <AppManagement appId={appId} subNav={subNav} />
    </Layout>
  ) : (
    <Layout>
      <AppManagement subNav={subNav} />
    </Layout>
  );

  return {
    chunks: ['appManagement'],
    redirect: '/appManagement/app',
    title: `${subTitle} - ${title}`,
    component,
    beforeEnter: [
      () => {
        // 当切换应用管理页子导航、点击列表中应用项，子导航切换，路由变化
        store.dispatch(onTabChange(subNav));
        store.dispatch(getAppAndAdposList(subNav, appId));
      },
    ],
  };
}

export default action;
