/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';
import history from '../../history';

class Home extends React.Component {
  onClick = () => {
    const pushParams = { a: 1, b: 2 };
    history.push({
      pathname: `/adGroup`,
      pushParams,
    });
  };
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 onClick={this.onClick} role="none">
            首页2：Page Not Found
          </h1>
          <p>Sorry, the page you were trying to view does not exist.</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
