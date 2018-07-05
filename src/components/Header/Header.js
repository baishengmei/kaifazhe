/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';

class Header extends React.Component {
  static propTypes = {
    onLogout: PropTypes.func.isRequired,
  };

  render() {
    const { onLogout } = this.props;
    return (
      <header className={`${s.root} root`}>
        <div className={s.container}>
          <Link className={s.brand} to="/">
            <span className={s.brand__logo} />
            <span className={s.brand__txt}>有道智选开发者平台</span>
          </Link>
          <section className={s.links}>
            <span className={`${s.link} ${s.noclick}`}>消息</span>
            <span className={s.splitter}>|</span>
            <span className={`${s.link} ${s.noclick}`}>123456@163.com</span>
            <span className={s.splitter}>|</span>
            {/* https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/270 */}
            <span className={s.link} onClick={onLogout} role="presentation">
              退出
            </span>
          </section>
        </div>
      </header>
    );
  }
}

export default withStyles(s)(Header);
