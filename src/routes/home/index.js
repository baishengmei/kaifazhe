/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from '../../pages/home'; // 这里之后需要改成container路径
import Layout from '../../components/Layout';

const title = '首页';
async function action() {
  return {
    title,
    chunks: ['home'],
    redirect: '/home',
    component: (
      <Layout>
        <Home />
      </Layout>
    ),
  };
}

export default action;
