import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Radio } from 'antd';
import s from '../index.css';
import {
  classnames,
  updateComponentStateByKeys,
  componentUpdateByState,
} from '../../../../core/utils';
import { AdPosObject } from '../../../../constants/MenuTypes';
// import Icons from '../../../../components/Icons';

const { Group: RadioGroup } = Radio;

const adPosTypeItems = AdPosObject.splice(1).map(t => (
  <Radio className={s.radio} key={t.value} value={t.value}>
    {t.name}
  </Radio>
));

/* eslint-disable react/no-unused-prop-types */
class AdPosInfo extends Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    adPosName: PropTypes.string.isRequired,
    adPosType: PropTypes.string.isRequired,
    callBackUrl: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    const stateKeys = ['appName', 'adPosName', 'adPosType', 'callBackUrl'];
    this.state = {};
    stateKeys.forEach(key => {
      this.state[key] = props[key];
    });
    this.hasFocusAppName = false;
    this.hasFocusAppType = false;
    this.componentWillReceiveProps = updateComponentStateByKeys(stateKeys);
    this.shouldComponentUpdate = componentUpdateByState;
  }

  render() {
    const {
      appName,
      adPosName,
      adPosType,
      callBackUrl,
      // appNameValid,
      // appTypeValid,
    } = this.state;
    // const showAppNameError = !appNameValid && this.hasFocusAppName;
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
                  // [s.error]: nameConflict || showAppNameError,
                })}
                value={adPosName}
                onChange={this.onAppNameChange}
                onFocus={this.onAppNameFocus}
              />
              <div
                className={classnames({
                  [s['input-hint']]: true,
                  // [s.error]: showAppNameError,
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
                onChange={this.onOsTypeChange}
              >
                {adPosTypeItems}
              </RadioGroup>
            </div>
          </div>
          <div className={s['setting-item']}>
            <div className={s['setting-item__name']}>回调地址</div>
            <div className={s['setting-item__value']}>
              <Input
                className={classnames({
                  [s.input]: true,
                  [s['android-item_value']]: true,
                })}
                value={callBackUrl}
                onChange={this.onAndroidPackageChange}
              />
              <div
                className={classnames({
                  [s['input-hint']]: true,
                  // [s.error]: showAppNameError,
                })}
              >
                该项视需求选填，是callback_url字段链接，相应的callback_url_secret_key会线下沟通发送
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { AdPosInfo as default };
