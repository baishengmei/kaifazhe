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
import New from '../../containers/appManagement/New';
import { resetAppItem, editingApp } from '../../actions/AppManagement/new';

const title = '新建应用管理';
const editingPageType = {
  app: 'app',
  adSlot: 'adSlot',
  selfTest: 'selfTest',
  toAudit: 'toAudit',
};
// const { app, adSlot, selfTest, toAudit } = editingPageType;
const { app } = editingPageType;
const editingPageTitle = {
  app: '新建应用',
  adSlot: '新建广告位',
  selfTest: '集成与自测',
  toAudit: '提交审核',
};

const editingActions = {
  [app]: editingApp,
  // [adSlot]: editingAdPos,
  // [selfTest]: editingSelfAudit,
  // [toAudit]: editingToAudit,
};

async function action({ store, params }) {
  const params0 = params['0'];
  const appId = params['1'];
  const type = appId ? params0.replace(/(\d+\/)/, '') : params0;
  const subTitle = editingPageTitle[type];
  return {
    chunks: ['appManagement'],
    title: `${subTitle} - ${title}`,
    component: (
      <Layout>
        <New />
      </Layout>
    ),
    beforeEnter: [
      () => {
        /** 这里需要调整下说明，不一定适用该场景！！！！！！！！！
         * 如果是新建应用，则清空应用或者广告位，
         * 否则在此之前新建广告位、自测页面、提交审核页面成功或失败的状态
         * 会在应用创建失败的时候影响 pages/appManagement/app/index.js 中对流程的判断
         * 新建应用也是类似情况
         */
        if (type === app) {
          store.dispatch(resetAppItem());
        }
        // if (type === editingActions.adSlot) {
        //   store.dispatch(resetAdPosItem());
        // }
        // if (type !== editingActions.toAudit) {
        //   store.dispatch(resetAdSlotItem());
        // }
        store.dispatch(editingActions[type]());
      },
    ],
  };
}

export default action;
