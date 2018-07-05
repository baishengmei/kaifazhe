/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

const tabs = [
  {
    name: '首页',
    path: '/home',
  },
  {
    name: '应用管理',
    path: '/appManagement',
  },
  {
    name: '数据报表',
    path: '/dataReport',
  },
  {
    name: '帮助中心',
    path: '/helpCenter',
  },
  {
    name: '账户管理',
    path: '/accountManagement',
  },
];

function Navigation({ path }) {
  return (
    <section className={`${s.root} root`} role="navigation">
      <div className={s.container}>
        <div className={s.tabs}>
          {tabs.map(tab => (
            <Link
              key={tab.path}
              className={
                path.startsWith(tab.path) ? `${s.tab} ${s.active}` : s.tab
              }
              to={tab.path}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

Navigation.propTypes = {
  path: PropTypes.string.isRequired,
};

export default withStyles(s)(Navigation);
