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

class UploadInstallPackage extends Component {
  static propTypes = {
    installPackage: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    const { installPackage } = props;
    this.state = {
      installPackage,
    };
  }

  onChange = pak => {
    console.info(pak, '打印上传图片的内容');
  };

  getInstallPackageComponent = installPackage => {
    return (
      <div className={s['setting-item__value']}>
        <div
          className={classnames({
            [s['input-hint']]: true,
            [s2['mainimage-hint']]: true,
          })}
        >
          支持格式：APK、IPA，最大 400MB
        </div>
        <ImageUploader
          imageInfoList={[installPackage]}
          onImageChange={pak => {
            this.onChange(pak);
          }}
          maxSize={400 * 1024 * 1024}
          text="上传安装包"
        />
      </div>
    );
  };

  render() {
    const { installPackage } = this.state;
    return (
      <div className={s.setting}>
        <div className={s.setting__title}>上传安装包</div>
        <div className={s['setting-item']}>
          <div className={s['setting-item__name']}>上传安装包</div>
          {this.getInstallPackageComponent(installPackage)}
        </div>
      </div>
    );
  }
}

export default withStyles(s, s2)(UploadInstallPackage);
