import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from '../index.css';

/* eslint-disable react/no-unused-prop-types */
class StyleInfo extends Component {
  static propTypes = {
    adPosInfo: PropTypes.shape({}).isRequired,
    styleInfo: PropTypes.shape({}).isRequired,
  };
  constructor(props) {
    super(props);
    const { adPosInfo, styleInfo } = this.props;
    this.state = {
      adPosInfo,
      styleInfo,
    };
  }
  render() {
    const { adPosInfo, styleInfo } = this.state;
    console.info(adPosInfo, styleInfo, '打印adPosStyle');
    return (
      <div className={s.setting}>
        <div className={s.setting__title}>广告位信息</div>
      </div>
    );
  }
}

export { StyleInfo as default };
