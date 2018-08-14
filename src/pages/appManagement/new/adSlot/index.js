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
    onSaveData: PropTypes.func.isRequired,
    // onGoToAdList: PropTypes.func.isRequired,
    onAdPosAddElem: PropTypes.func,
    onAddOrDelStyle: PropTypes.func,
    onDataChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onAdPosAddElem: null,
    onAddOrDelStyle: null,
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

  // itemType: 当前编辑的项，如：广告位名称； value：当前编辑项的值
  onAdPosInfoChange = (itemType, itemValue) => {
    this.props.onDataChange(NewAdPosSettingItems[0].value, itemType, itemValue);
  };
  onAdPosStyleInfoChange = (itemType, itemValue, itemIndex) => {
    this.props.onDataChange(
      NewAdPosSettingItems[1].value,
      itemType,
      itemValue,
      itemIndex,
    );
  };

  onAdPosNameChange = value => {
    this.onAdPosInfoChange('adPosName', value);
  };
  onAdPosTypeChange = value => {
    this.onAdPosInfoChange('adPosType', value);
  };
  onCallBackUrlChange = value => {
    this.onAdPosInfoChange('callBackUrl', value);
  };

  onFlowInfoTypeChange = (value, index) => {
    this.onAdPosStyleInfoChange('flowInfoStyleType', value, index);
  };
  onStyleNameChange = (value, index) => {
    this.onAdPosStyleInfoChange('styleName', value, index);
  };
  onObjectChange = (value, index) => {
    this.onAdPosStyleInfoChange('objectType', value, index);
  };
  onAppVersionChange = (value, index) => {
    this.onAdPosStyleInfoChange('appVersion', value, index);
  };

  getFormValid = () =>
    Object.values(this.subItemValidity)
      .map(subArr => subArr.reduce((a, b) => a && b))
      .reduce((a, b) => a && b);

  render() {
    const { status, adPosInfo, styleInfo } = this.state;
    const { onAdPosAddElem, onAddOrDelStyle } = this.props;
    const cancelHintText = `您当前正在新建应用，确定要取消新建吗？`;

    return (
      <div className={s.main}>
        <AdPosInfo
          {...adPosInfo}
          // appNameValid={newAppValidity[0]}
          // appTypeValid={newAppValidity[1]}
          onAdPosNameChange={this.onAdPosNameChange}
          onAdPosTypeChange={this.onAdPosTypeChange}
          onCallBackUrlChange={this.onCallBackUrlChange}
          // onOsTypeChange={this.onOsTypeChange}
          // onCategoryChange={this.onCategoryChange}
          // onAndroidPackageChange={this.onAndroidPackageChange}
        />
        <StyleInfo
          styleInfo={styleInfo}
          {...adPosInfo}
          onAddElem={onAdPosAddElem}
          onAddOrDelStyle={onAddOrDelStyle}
          onFlowInfoTypeChange={this.onFlowInfoTypeChange}
          onStyleNameChange={this.onStyleNameChange}
          onObjectChange={this.onObjectChange}
          onAppVersionChange={this.onAppVersionChange}
          // onNameChange={this.onNameChange}
          onElemInfoItemChange={this.onAdPosStyleInfoChange}
        />
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
