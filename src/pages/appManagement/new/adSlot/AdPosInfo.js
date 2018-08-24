import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Radio } from 'antd';
import s from '../index.css';
import {
  classnames,
  updateComponentStateByKeys,
  componentUpdateByState,
  isValidAppAdPosEntityName,
} from '../../../../core/utils';
import {
  AdPosObject,
  AppAdposListMapForFE,
} from '../../../../constants/MenuTypes';
// import Icons from '../../../../components/Icons';

const { Group: RadioGroup } = Radio;

const adPosTypeItems = AdPosObject.slice(1).map(t => (
  <Radio className={s.radio} key={t.value} value={t.value}>
    {t.name}
  </Radio>
));

const checkAdPosNameValidity = value => isValidAppAdPosEntityName(value);

/* eslint-disable react/no-unused-prop-types */
class AdPosInfo extends Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    adPosName: PropTypes.string.isRequired,
    adPosType: PropTypes.string.isRequired,
    callBackUrl: PropTypes.string.isRequired,
    onAdPosNameChange: PropTypes.func.isRequired,
    onAdPosTypeChange: PropTypes.func.isRequired,
    onCallBackUrlChange: PropTypes.func.isRequired,
    adPosNameValid: PropTypes.bool.isRequired,
    nameConflict: PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);
    const stateKeys = [
      'appName',
      'adPosName',
      'adPosType',
      'callBackUrl',
      'adPosNameValid',
      'nameConflict',
    ];
    this.state = {};
    stateKeys.forEach(key => {
      this.state[key] = props[key];
    });
    this.hasFocusAdPosName = false;
    this.hasFocusAppType = false;
    this.componentWillReceiveProps = updateComponentStateByKeys(stateKeys);
    this.shouldComponentUpdate = componentUpdateByState;
  }

  componentDidUpdate(_, prevState) {
    const { nameConflict } = this.state;
    // 用于广告实体名字重复时候的滚动操作
    if (nameConflict && !prevState.nameConflict) {
      this.entityName.input.scrollIntoViewIfNeeded();
    }
  }

  onAdPosNameFocus = () => {
    this.hasFocusAdPosName = true;
  };

  onAdPosNameChange = e => {
    const { value } = e.target;
    this.setState(
      {
        adPosNameValid: checkAdPosNameValidity(value),
      },
      () => {
        this.props.onAdPosNameChange(value);
      },
    );
  };

  onAdPosTypeChange = e => {
    const { value } = e.target;
    this.props.onAdPosTypeChange(value);
  };

  onCallBackUrlChange = e => {
    const { value } = e.target;
    this.props.onCallBackUrlChange(value);
  };

  render() {
    const {
      appName,
      adPosType,
      adPosNameValid,
      nameConflict,
      // appNameValid,
      // appTypeValid,
    } = this.state;
    const showAdPosNameError = !adPosNameValid && this.hasFocusAdPosName;
    // const showTopCategoryError =
    //   topCategory.name === '一级分类' && this.hasFocusAppType;
    // const showSecCategoryError =
    //   (showTopCategoryError || !appTypeValid) && this.hasFocusAppType;
    return (
      <div className={s.setting}>
        <div className={s.setting__title}>广告位信息</div>
        <div className={s['setting-item']}>
          <div className={s['setting-item__name']}>应用名称</div>
          <div className={s['setting-item__value']}>
            <div className={s.appAdPosName}>{appName}</div>
          </div>
        </div>
        <div style={{ paddingTop: 6 }}>
          <div className={s['setting-item']}>
            <div className={s['setting-item__name']}>广告位名称</div>
            <div className={s['setting-item__value']}>
              <Input
                ref={input => {
                  this.entityName = input;
                }}
                className={classnames({
                  [s.input]: true,
                  [s['adentity-name-input']]: true,
                  [s.error]: nameConflict || showAdPosNameError,
                })}
                onChange={this.onAdPosNameChange}
                onFocus={this.onAdPosNameFocus}
              />
              <div
                className={classnames({
                  [s['input-hint']]: true,
                  [s.error]: showAdPosNameError,
                })}
              >
                必填，最多 15 个字
              </div>
            </div>
          </div>
          <div className={s['setting-item']}>
            <div
              className={classnames({
                [s['setting-item__name']]: true,
                [s['radio']]: true,
              })}
            >
              广告位类型
            </div>
            <div className={s['setting-item__value']}>
              <RadioGroup
                size="large"
                value={adPosType}
                onChange={this.onAdPosTypeChange}
              >
                {adPosTypeItems}
              </RadioGroup>
            </div>
          </div>
          {adPosType === AdPosObject[5].value && (
            <div className={s['setting-item']}>
              <div className={s['setting-item__name']}>回调地址</div>
              <div className={s['setting-item__value']}>
                <Input
                  className={classnames({
                    [s.input]: true,
                    [s['android-item_value']]: true,
                  })}
                  onChange={this.onCallBackUrlChange}
                />
                <div
                  className={classnames({
                    [s['input-hint']]: true,
                  })}
                >
                  该项视需求选填，是callback_url字段链接，相应的callback_url_secret_key会线下沟通发送
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export { AdPosInfo as default, checkAdPosNameValidity };
