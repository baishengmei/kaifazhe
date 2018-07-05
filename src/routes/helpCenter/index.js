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
import Page from '../../components/Page';
import helpCenter from './helpCenter.md';

function action() {
  return {
    chunks: ['helpCenter'],
    title: helpCenter.title,
    component: (
      <Layout>
        <Page {...helpCenter} />
      </Layout>
    ),
  };
}

export default action;
