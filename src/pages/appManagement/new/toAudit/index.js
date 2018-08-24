import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../index.css';
import UploadScreenShot from './UploadScreenShot';
import UploadInstallPackage from './UploadInstallPackage';
import FormFooterActionBar from '../FormFooterActionBar';
import {
  NewAppSettingItems,
  OperationStatus,
  // saveButtonText,
} from '../../../../constants/MenuTypes';
import {
  componentUpdateByState,
  updateComponentStateByKeys,
} from '../../../../core/utils';

class ToAudit extends Component {
  static propTypes = {
    uploadScreenShot: PropTypes.shape({
      adPosName: PropTypes.string.isRequired,
      styleInfo: PropTypes.array.isRequired,
    }).isRequired,
    uploadInstallPackage: PropTypes.shape({
      installPackage: PropTypes.object.isRequired,
    }).isRequired,
  };
  constructor(props) {
    super(props);
    const {
      uploadScreenShot: { adPosName, styleInfo },
      uploadInstallPackage: { installPackage },
    } = props;
    this.state = {
      adPosName,
      styleInfo,
      installPackage,
    };
    this.componentWillReceiveProps = updateComponentStateByKeys([
      'adPosName',
      'styleInfo',
      'installPackage',
    ]);
    this.shouldComponentUpdate = componentUpdateByState;
  }
  onSave = () => {};
  onCancel = () => {};
  render() {
    // const { status, newApp, formValid } = this.state;
    const cancelHintText = `您当前正在新建应用，确定要取消新建吗？`;
    // const savingType = false; // 它可以设置一个state，当点击按钮时，更新该state，并传入到组件中
    // const { newApp: newAppValidity } = this.subItemValidity;
    const formValid = true;
    const { adPosName, styleInfo, installPackage } = this.state;
    const saveButtonText = ['提交审核'];

    return (
      <div className={s.main}>
        <UploadScreenShot adPosName={adPosName} styleInfo={styleInfo} />
        <UploadInstallPackage installPackage={installPackage} />
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
