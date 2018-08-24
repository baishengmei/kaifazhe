import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input, Radio } from 'antd';
import s from '../index.css';
import s2 from './index.css';
import {
  classnames,
  // updateComponentStateByKeys,
  // componentUpdateByState,
} from '../../../../core/utils';
import ImageUploader from './ImageUploader';

class UploadScreenShot extends Component {
  static propTypes = {
    adPosName: PropTypes.string.isRequired,
    styleInfo: PropTypes.arrayOf.isRequired,
  };

  constructor(props) {
    super(props);
    const { adPosName, styleInfo } = props;
    this.state = {
      adPosName,
      styleInfo,
    };
  }

  onImageChange = (styleIndex, imageInfoList) => {
    console.info(styleIndex, imageInfoList, '打印上传图片的内容');
  };

  getImageComponent = (styleIndex, screenShots) => {
    return (
      <div className={s['setting-item__value']}>
        <div
          className={classnames({
            [s['input-hint']]: true,
            [s2['mainimage-hint']]: true,
          })}
        >
          支持格式：JPG、PNG，最大 1MB
        </div>
        <ImageUploader
          imageInfoList={screenShots}
          onImageChange={imageInfoList => {
            this.onImageChange(styleIndex, imageInfoList);
          }}
          maxSize={1024 * 1024}
          text="上传图片"
        />
      </div>
    );
  };

  render() {
    const { adPosName, styleInfo } = this.state;
    return (
      <div className={s.setting}>
        <div className={s.setting__title}>上传截图</div>
        <div className={s['setting-item']}>
          <div className={s['setting-item__name']}>广告位名称</div>
          <div className={s['setting-item__value']}>
            <div className={s.appAdPosName}>{adPosName}</div>
          </div>
        </div>
        {styleInfo.map((style, index) => {
          return (
            <div>
              <div style={{ paddingTop: 6 }}>
                <div className={s['setting-item']}>
                  <div className={s['setting-item__name']}>样式名称</div>
                  <div className={s['setting-item__value']}>
                    <div className={s.appAdPosName}>{style.styleName}</div>
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: 6 }}>
                <div className={s['setting-item']}>
                  <div className={s['setting-item__name']}>样式状态</div>
                  <div className={s['setting-item__value']}>
                    <div className={s.appAdPosName}>{style.styleStatus}</div>
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: 6 }}>
                <div className={s['setting-item']}>
                  <div className={s['setting-item__name']}>样式截图</div>
                  {this.getImageComponent(index, style.screenShot)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withStyles(s, s2)(UploadScreenShot);
