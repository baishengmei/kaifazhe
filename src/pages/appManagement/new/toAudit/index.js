import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../index.css';
import UploadShot from './UploadScreenShot';
import UploadPackage from './UploadInstallPackage';
import FormFooterActionBar from '../FormFooterActionBar';
import {
  NewAppSettingItems,
  OperationStatus,
  saveButtonText,
} from '../../../../constants/MenuTypes';
import { componentUpdateByState } from '../../../../core/utils';

class ToAudit extends Component {
  constructor(props) {
    super(props);
  }
  onSave = () => {};
  onCancel = () => {};
  render() {
    // const { status, newApp, formValid } = this.state;
    const cancelHintText = `您当前正在新建应用，确定要取消新建吗？`;
    // const savingType = false; // 它可以设置一个state，当点击按钮时，更新该state，并传入到组件中
    // const { newApp: newAppValidity } = this.subItemValidity;
    const formValid = true;

    return (
      <div className={s.main}>
        {/* <UploadShot />
        <UploadPackage /> */}
        <FormFooterActionBar
          status="load_success"
          cancelHintText={cancelHintText}
          saveButtonText={saveButtonText}
          saveButtonValid={status !== OperationStatus.load_fail && formValid}
          onSave={this.onSave}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}

export default withStyles(s)(ToAudit);
