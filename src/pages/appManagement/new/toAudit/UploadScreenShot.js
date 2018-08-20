import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input, Radio } from 'antd';
import s from '../index.css';
import {
  classnames,
  // updateComponentStateByKeys,
  // componentUpdateByState,
} from '../../../../core/utils';

class UploadShot extends Component {
  render() {
    return (
      <div className={s.setting}>
        <div className={s.setting__title}>上传截图</div>
        <div className={s['setting-item']}>
          <div className={s['setting-item__name']}>广告位名称</div>
          <div className={s['setting-item__value']}>
            <div className={s.appAdPosName}>测试仪</div>
          </div>
        </div>
        <div style={{ paddingTop: 6 }}>
          <div className={s['setting-item']}>
            <div className={s['setting-item__name']}>样式名称</div>
            <div className={s['setting-item__value']}>
              <div className={s.appAdPosName}>测试仪2</div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 6 }}>
          <div className={s['setting-item']}>
            <div className={s['setting-item__name']}>样式名称</div>
            <div className={s['setting-item__value']}>
              <div className={s.appAdPosName}>测试仪2</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadShot;
