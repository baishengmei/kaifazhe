import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../index.css';
import NewApp, { checkAppNameValidity, checkAppTypeValidity } from './NewApp';
import FormFooterActionBar from '../FormFooterActionBar';
import {
  NewAppSettingItems,
  OperationStatus,
  saveButtonText,
} from '../../../../constants/MenuTypes';
import { componentUpdateByState } from '../../../../core/utils';

class App extends Component {
  static propTypes = {
    status: PropTypes.oneOf(Object.keys(OperationStatus)).isRequired,
    appTag: PropTypes.bool.isRequired,
    newApp: PropTypes.shape({}).isRequired,
    onDataChange: PropTypes.func.isRequired,
    onSaveData: PropTypes.func.isRequired,
    onGoToAppList: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { status, newApp } = props;
    // 取消新建后跳转的路径
    this.subItemValidity = Object.create(null);
    this.setValidity(props);
    this.state = {
      status,
      newApp,
      formValid: this.getFormValid(),
    };
    this.shouldComponentUpdate = componentUpdateByState;
  }

  componentWillReceiveProps(nextProps) {
    this.setValidity(nextProps);
    this.setState({
      status: nextProps.status,
      newApp: nextProps.newApp,
      formValid: this.getFormValid(),
    });
  }

  // itemType: 当前编辑的项，如：平台； value：当前编辑项的值，如：安卓
  onNewAppChange = (itemType, itemValue) => {
    this.props.onDataChange(NewAppSettingItems[0].value, itemType, itemValue);
  };
  onAppNameChange = value => {
    this.onNewAppChange('appName', value);
  };
  onOsTypeChange = value => {
    this.onNewAppChange('osType', value);
  };
  onCategoryChange = value => {
    this.onNewAppChange('appType', value);
  };
  onAndroidPackageChange = value => {
    this.onNewAppChange('androidPackage', value);
  };

  onSave = btnText => {
    // true 保存；false: 保存并继续
    const saveType = btnText === saveButtonText[0];
    this.props.onSaveData(saveType);
  };

  onCancel = () => {
    // 点击取消后，点击确定按钮，跳转到对应的页面
    this.props.onGoToAppList('app');
  };

  setValidity = data => {
    this.setNewAppValidity(data.newApp);
  };

  setNewAppValidity = na => {
    this.subItemValidity.newApp = [
      checkAppNameValidity(na.appName), // appName validity
      checkAppTypeValidity(na.appType), // appType validity
    ];
  };

  getFormValid = () =>
    Object.values(this.subItemValidity)
      .map(subArr => subArr.reduce((a, b) => a && b))
      .reduce((a, b) => a && b);

  render() {
    const { status, newApp, formValid } = this.state;
    const cancelHintText = `您当前正在新建应用，确定要取消新建吗？`;
    // const savingType = false; // 它可以设置一个state，当点击按钮时，更新该state，并传入到组件中
    const { newApp: newAppValidity } = this.subItemValidity;

    return (
      <div className={s.main}>
        <NewApp
          {...newApp}
          appNameValid={newAppValidity[0]}
          appTypeValid={newAppValidity[1]}
          onAppNameChange={this.onAppNameChange}
          onOsTypeChange={this.onOsTypeChange}
          onCategoryChange={this.onCategoryChange}
          onAndroidPackageChange={this.onAndroidPackageChange}
        />
        <FormFooterActionBar
          status={status}
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

export default withStyles(s)(App);
