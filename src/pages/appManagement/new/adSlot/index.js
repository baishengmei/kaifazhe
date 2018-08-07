import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../index.css';
import s2 from './index.css';
import AdPosInfo from './AdPosInfo';
import StyleInfo from './StyleInfo';
import FormFooterActionBar from '../FormFooterActionBar';
import {
  NewAdPosSettingItems,
  OperationStatus,
  saveButtonText,
} from '../../../../constants/MenuTypes';
import { componentUpdateByState } from '../../../../core/utils';

class AdSlot extends Component {
  static propTypes = {
    status: PropTypes.oneOf(Object.keys(OperationStatus)).isRequired,
    appTag: PropTypes.bool.isRequired,
    adPosTag: PropTypes.bool.isRequired,
    adPosInfo: PropTypes.shape({}).isRequired,
    styleInfo: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    // onDataChange: PropTypes.func.isRequired,
    // onSaveData: PropTypes.func.isRequired,
    // onGoToAdList: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { status, adPosInfo, styleInfo } = props;
    // 取消新建后跳转的路径
    this.subItemValidity = Object.create(null);
    this.state = {
      status,
      adPosInfo,
      styleInfo,
    };
    this.shouldComponentUpdate = componentUpdateByState;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      status: nextProps.status,
      adPosInfo: nextProps.adPosInfo,
      styleInfo: nextProps.styleInfo,
    });
  }

  onSave = btnText => {
    console.info(btnText, '打印按钮点击类型');
    // true 保存；false: 保存并继续
    const saveType = btnText === saveButtonText[0];
    saveType ? this.onOnlySaveData() : this.props.onSaveData(saveType);
  };

  onOnlySaveData = () => {
    console.info('这里之后写成props，因为这里要替换成点击保存时触发的函数');
  };

  onCancel = () => {
    // 点击取消后，点击确定按钮，跳转到对应的页面
    // this.props.onGoToAdList(AppTabTypes.sponsorAdCampaign);
  };

  getFormValid = () =>
    Object.values(this.subItemValidity)
      .map(subArr => subArr.reduce((a, b) => a && b))
      .reduce((a, b) => a && b);

  render() {
    const { status, adPosInfo, styleInfo } = this.state;
    const cancelHintText = `您当前正在新建应用，确定要取消新建吗？`;

    return (
      <div className={s.main}>
        <AdPosInfo
          {...adPosInfo}
          // appNameValid={newAppValidity[0]}
          // appTypeValid={newAppValidity[1]}
          // onAppNameChange={this.onAppNameChange}
          // onOsTypeChange={this.onOsTypeChange}
          // onCategoryChange={this.onCategoryChange}
          // onAndroidPackageChange={this.onAndroidPackageChange}
        />
        <StyleInfo styleInfo={styleInfo} {...adPosInfo} />
        <FormFooterActionBar
          status={status}
          cancelHintText={cancelHintText}
          saveButtonText={saveButtonText}
          saveButtonValid={status !== OperationStatus.load_fail}
          onSave={this.onSave}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}

export default withStyles(s2)(AdSlot);
