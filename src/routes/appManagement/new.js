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
// import AppManagement from '../../containers/appManagement/AppManagement';

const title = '新建应用管理';

function action({ params }) {
  console.info(params, '的就是雷锋精神了22222');
  return {
    chunks: ['appManagement'],
    title,
    component: (
      <Layout>
        <div>新建页面</div>
      </Layout>
    ),
  };
}

export default action;
