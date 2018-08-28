import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../index.css';
import s2 from './index.css';
import AdPosInfo, { checkAdPosNameValidity } from './AdPosInfo';
import StyleInfo, { checkStyleInfoValidity } from './StyleInfo';
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
    onGoToAppList: PropTypes.func.isRequired,
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
    this.setValidity(props);
    this.state = {
      status,
      adPosInfo,
      styleInfo,
      formValid: this.getFormValid(),
    };
    this.shouldComponentUpdate = componentUpdateByState;
  }

  componentWillReceiveProps(nextProps) {
    this.setValidity(nextProps);
    this.setState({
      status: nextProps.status,
      adPosInfo: nextProps.adPosInfo,
      styleInfo: nextProps.styleInfo,
      formValid: this.getFormValid(),
    });
  }

  onSave = btnText => {
    console.info(btnText, '打印按钮点击类型');
    // true 保存；false: 保存并继续
    const saveType = btnText === saveButtonText[0];
    this.props.onSaveData(saveType);
  };

  onCancel = () => {
    // 点击取消后，点击确定按钮，跳转到对应的页面
    this.props.onGoToAppList('adPos');
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
  onStyleNameChange = (value, valid, index) => {
    this.onAdPosStyleInfoChange('styleName', value, index);
    this.onAdPosStyleInfoChange('styleNameValid', valid, index);
  };
  onObjectChange = (value, index) => {
    this.onAdPosStyleInfoChange('objectType', value, index);
  };
  onAppVersionChange = (value, index) => {
    this.onAdPosStyleInfoChange('appVersion', value, index);
  };

  setValidity = data => {
    this.setAdPosInfoValidity(data.adPosInfo);
    this.setStyleInfoValidity(data.styleInfo);
  };

  setAdPosInfoValidity = posi => {
    this.subItemValidity.adPosInfo = [
      checkAdPosNameValidity(posi.adPosName), // adPosName validity
    ];
  };

  setStyleInfoValidity = si => {
    this.subItemValidity.styleInfo = [checkStyleInfoValidity(si)];
  };

  getFormValid = () =>
    Object.values(this.subItemValidity)
      .map(subArr => subArr.reduce((a, b) => a && b))
      .reduce((a, b) => a && b);

  render() {
    const { status, adPosInfo, styleInfo, formValid } = this.state;
    const { onAdPosAddElem, onAddOrDelStyle } = this.props;
    const cancelHintText = `您当前正在新建应用，确定要取消新建吗？`;
    const {
      adPosInfo: adPosInfoValidity,
      styleInfo: styleInfoValidity,
    } = this.subItemValidity;

    return (
      <div className={s.main}>
        <AdPosInfo
          {...adPosInfo}
          adPosNameValid={adPosInfoValidity[0]}
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
          styleInfoValid={styleInfoValidity[0]}
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
          saveButtonValid={status !== OperationStatus.load_fail && formValid}
          onSave={this.onSave}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}

export default withStyles(s2)(AdSlot);
