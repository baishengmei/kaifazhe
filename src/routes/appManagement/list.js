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

const title = '应用管理';

function action({ params }) {
  const subTitle = params['0'] === 'app' ? '应用' : '广告位';
  const appId = params['1'] && params['1'].replace(/(\/)$/, '');
  return {
    chunks: ['appManagement'],
    redirect: '/appManagement/app',
    title: `${subTitle} - ${title}`,
    component: (
      <Layout>
        <AppManagement appId={appId} />
      </Layout>
    ),
  };
}

export default action;
