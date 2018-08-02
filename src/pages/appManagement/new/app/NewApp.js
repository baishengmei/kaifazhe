import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Icon, Input, Select } from 'antd';
import s from '../index.css';
import Icons from '../../../../components/Icons';
import { AppOsTypeZH } from '../../../../constants/MenuTypes';
import {
  classnames,
  updateComponentStateByKeys,
  componentUpdateByState,
  isValidAppAdPosEntityName,
} from '../../../../core/utils';

const { Group: RadioGroup, Button: RadioButton } = Radio;
const { Option } = Select;

const osTypeItems = AppOsTypeZH.map(t => (
  <RadioButton value={t.value} key={t.value}>
    <Icon className={s['checked-object']} type="check-circle" />
    {Icons[t.value]} &nbsp;{t.name}
  </RadioButton>
));

const checkAppNameValidity = value => isValidAppAdPosEntityName(value);

const checkAppTypeValidity = value =>
  typeof value === 'string' && value.trim() !== '二级分类';

/* eslint-disable react/no-unused-prop-types */
class NewApp extends Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    osType: PropTypes.string.isRequired,
    appType: PropTypes.string.isRequired,
    nameConflict: PropTypes.bool.isRequired,
    appNameValid: PropTypes.bool.isRequired,
    appTypeValid: PropTypes.bool.isRequired,
    androidPackage: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        children: PropTypes.array,
      }).isRequired,
    ).isRequired,
    onAppNameChange: PropTypes.func.isRequired,
    onOsTypeChange: PropTypes.func.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    onAndroidPackageChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const stateKeys = [
      'appName',
      'osType',
      'appType',
      'nameConflict',
      'androidPackage',
      'categories',
      'appNameValid',
      'appTypeValid',
    ];
    this.state = {
      topCategory: { name: '一级分类' },
    };
    stateKeys.forEach(key => {
      this.state[key] = props[key];
    });
    this.hasFocusAppName = false;
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

  onAppNameFocus = () => {
    this.hasFocusAppName = true;
  };

  onAppNameChange = e => {
    const { value } = e.target;
    this.setState(
      {
        appNameValid: checkAppNameValidity(value),
      },
      () => {
        this.props.onAppNameChange(value);
      },
    );
  };

  onOsTypeChange = e => {
    this.props.onOsTypeChange(e.target.value);
  };

  onTopCategoryChange = value => {
    const topCategory = this.state.categories.find(t => t.name === value);
    this.setState({
      topCategory,
      appTypeValid: false,
    });
    this.hasFocusAppType = true;
    this.props.onCategoryChange('二级分类');
  };

  onSecCategoryChange = value => {
    this.setState(
      {
        appTypeValid: true,
      },
      () => {
        this.props.onCategoryChange(value);
      },
    );
  };

  onAndroidPackageChange = e => {
    this.props.onAndroidPackageChange(e.target.value);
  };

  CategorieItems = () =>
    this.state.categories.map(t => (
      <Option value={t.name} key={t.id}>
        {t.name}
      </Option>
    ));

  SubCategorieItems = () =>
    this.state.topCategory.children &&
    this.state.topCategory.children.map(t => (
      <Option value={t.name} key={t.id}>
        {t.name}
      </Option>
    ));

  render() {
    const {
      appName,
      osType,
      appType,
      nameConflict,
      androidPackage,
      topCategory,
      appNameValid,
      appTypeValid,
    } = this.state;
    const showAppNameError = !appNameValid && this.hasFocusAppName;
    const showTopCategoryError =
      topCategory.name === '一级分类' && this.hasFocusAppType;
    const showSecCategoryError =
      (showTopCategoryError || !appTypeValid) && this.hasFocusAppType;
    return (
      <div className={s.setting}>
        <div className={s.setting__title}>新建应用</div>
        <div style={{ paddingTop: 6 }}>
          <div className={s['setting-item']}>
            <div className={s['setting-item__name']}>应用名称</div>
            <div className={s['setting-item__value']}>
              <Input
                ref={input => {
                  this.entityName = input;
                }}
                className={classnames({
                  [s.input]: true,
                  [s['adentity-name-input']]: true,
                  [s.error]: nameConflict || showAppNameError,
                })}
                value={appName}
                onChange={this.onAppNameChange}
                onFocus={this.onAppNameFocus}
              />
              <div
                className={classnames({
                  [s['input-hint']]: true,
                  [s.error]: showAppNameError,
                })}
              >
                必填，最多 15 个字
              </div>
            </div>
          </div>
          <div
            className={classnames({
              [s['setting-item']]: true,
              [s['setting-item__osType']]: true,
            })}
            style={{ paddingTop: 6 }}
          >
            <div className={s['setting-item__name']}>平台</div>
            <div className={s['setting-item__value']}>
              <RadioGroup
                size="large"
                value={osType}
                onChange={this.onOsTypeChange}
              >
                {osTypeItems}
              </RadioGroup>
            </div>
          </div>
          <div className={s['setting-item']}>
            <div className={s['setting-item__name']}>应用类型</div>
            <div className={s['setting-item__value']}>
              <div style={{ display: 'inline-block', marginRight: '16px' }}>
                <Select
                  style={{ width: 120 }}
                  className={classnames({
                    [s['error']]: showTopCategoryError,
                  })}
                  value={topCategory.name}
                  onChange={this.onTopCategoryChange}
                >
                  {this.CategorieItems()}
                </Select>
              </div>
              <Select
                style={{ width: 120 }}
                className={classnames({
                  [s.error]: showSecCategoryError,
                })}
                value={appType}
                onChange={this.onSecCategoryChange}
                disabled={topCategory.name === '一级分类'}
              >
                {this.SubCategorieItems()}
              </Select>
            </div>
          </div>
          <div className={s['setting-item']}>
            <div className={s['setting-item__name']}>Android包名</div>
            <div className={s['setting-item__value']}>
              <Input
                className={classnames({
                  [s.input]: true,
                  [s['android-item_value']]: true,
                })}
                value={androidPackage}
                onChange={this.onAndroidPackageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { NewApp as default, checkAppNameValidity, checkAppTypeValidity };
