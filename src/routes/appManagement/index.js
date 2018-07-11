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
import AppManagement from '../../pages/appManagement/list';

export default {
  path: '/appManagement',
  children: [
    /**
     * 应用管理列表页
     */
    {
      path: '',
      action: () => ({
        chunks: ['appManagement_list'],
        redirect: '/appManagement/app',
      }),
    },
    {
      path: '/app',
      title: '应用',
      action: () => ({
        title: '应用 - 应用管理',
        component: (
          <Layout>
            <AppManagement title="应用管理" />
          </Layout>
        ),
        beforeEnter: [
          () => {
            console.info('beforeEnter测试');
          },
        ],
      }),
    },
    {
      path: '/adSlot',
      chunks: ['appManagement'],
      title: '广告位',
      action: () => ({
        title: '广告位',
        component: (
          <Layout>
            <AppManagement title="应用管理" />
          </Layout>
        ),
      }),
    },
    /**
     * 应用管理新建页面
     */
    {
      path: '/new',
      chunks: ['appManagement_new'],
      action: () => ({
        title: '新建',
        component: (
          <Layout>
            <div>新建页面</div>,
          </Layout>
        ),
      }),
    },
    {
      path: '/id',
      action: () => ({
        title: '测试用',
        component: <div>Post</div>,
      }),
    },
  ],
};
