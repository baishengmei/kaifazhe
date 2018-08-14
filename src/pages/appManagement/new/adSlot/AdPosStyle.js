import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon, Input, Radio, Tooltip } from 'antd';
import s from '../index.css';
import s2 from './index.css';
import {
  AdPosAuditStatus,
  objectTypeItems,
  pictureElemsMapKey,
  textElemsMapKey,
  videoElemsMapKey,
  flowStyleItems,
  AdPosObject,
} from '../../../../constants/MenuTypes';
import {
  classnames,
  updateComponentStateByKeys,
  componentUpdateByState,
} from '../../../../core/utils';
import DataGrid from './DataGrid';

const { Group: RadioGroup, Button: RadioButton } = Radio;
const objectTypes = objectTypeItems.map(t => (
  <RadioButton value={t.value} key={t.value}>
    <Icon className={s2['checked-object']} type="check-circle" />
    {t.name}
  </RadioButton>
));

const appVersionTip = (
  <Tooltip title="如果APP的某个版本及以上才支持该广告位样式，则需修改填写相应版本号（格式为N.N.N.，如5.7.3），如果没有版本限制，则默认为0，无需修改此项。">
    <Icon type="question-circle-o" />
  </Tooltip>
);

/* eslint-disable react/no-unused-prop-types */
class AdPosStyle extends Component {
  static propTypes = {
    styleTitle: PropTypes.string.isRequired,
    auditStatus: PropTypes.string.isRequired,
    styleName: PropTypes.string.isRequired,
    objectType: PropTypes.string.isRequired,
    appVersion: PropTypes.string.isRequired,
    pictureElems: PropTypes.arrayOf(PropTypes.string.isRequired),
    pictures: PropTypes.arrayOf(PropTypes.object),
    textElems: PropTypes.arrayOf(PropTypes.string.isRequired),
    texts: PropTypes.arrayOf(PropTypes.object),
    videoElems: PropTypes.arrayOf(PropTypes.string.isRequired),
    videos: PropTypes.arrayOf(PropTypes.object),
    adPosType: PropTypes.string.isRequired,
    onAddElem: PropTypes.func,
    onDelStyle: PropTypes.func,
    isShowDel: PropTypes.bool.isRequired,
    flowInfoStyleType: PropTypes.string.isRequired,
  };

  static defaultProps = {
    pictures: [],
    texts: [],
    videos: [],
    pictureElems: [],
    textElems: [],
    videoElems: [],
    onAddElem: null,
    onDelStyle: null,
  };

  constructor(props) {
    super(props);
    const {
      styleTitle,
      styleName,
      auditStatus,
      objectType,
      appVersion,
      flowInfoStyleType,
      pictureElems,
      pictures,
      textElems,
      texts,
      videoElems,
      videos,
      adPosType,
      isShowDel,
    } = this.props;
    this.state = {
      styleTitle,
      styleName,
      auditStatus,
      objectType,
      appVersion,
      flowInfoStyleType,
      pictureElems,
      pictures,
      textElems,
      texts,
      videoElems,
      videos,
      adPosType,
      isShowDel,
    };
    this.componentWillReceiveProps = updateComponentStateByKeys([
      'styleTitle',
      'styleName',
      'auditStatus',
      'objectType',
      'appVersion',
      'flowInfoStyleType',
      'pictureElems',
      'pictures',
      'textElems',
      'texts',
      'videoElems',
      'videos',
      'adPosType',
      'isShowDel',
    ]);
    this.shouldComponentUpdate = componentUpdateByState;
  }

  onNameChange = () => {};
  onKeyChange = () => {};
  onRatioChange = () => {};
  onSizeChange = () => {};
  onWordNumChange = () => {};
  onDelElem = () => {};

  render() {
    const {
      styleTitle,
      styleName,
      auditStatus,
      objectType,
      appVersion,
      flowInfoStyleType,
      pictureElems,
      pictures,
      textElems,
      texts,
      videoElems,
      videos,
      adPosType,
      isShowDel,
    } = this.state;

    const { onAddElem, onDelStyle } = this.props;

    const styleTitleName =
      styleTitle === AdPosObject[1].value
        ? flowStyleItems.find(t => t.value === flowInfoStyleType).name
        : AdPosObject.find(t => t.value === styleTitle).name;
    const isAbleAddAndDel =
      auditStatus === AdPosAuditStatus[1].name &&
      adPosType !== AdPosObject[5].value; // 是否可添加元素和删除：草稿 && 不是视频视频 = true
    const isAbleEdit = auditStatus === AdPosAuditStatus[1].name; // 是否可编辑：草稿 = ture
    return (
      <div className={s2.setting__body_common}>
        <div className={s2.setting__body_header}>
          <div className={s2.setting__body_header_left}>
            <span>{styleTitleName}样式</span>
            <span>审核状态： {auditStatus}</span>
          </div>
          {auditStatus === AdPosAuditStatus[1].name &&
            isShowDel && (
              <div className={s2.setting__body_header_right}>
                <Icon type="close" onClick={onDelStyle} />
              </div>
            )}
        </div>
        <div className={s2.setting__body_content}>
          <div className={s2['setting__body_item']}>
            <div className={s2['setting__body_item__name']}>样式名称</div>
            <div className={s2['setting__body_item__value']}>
              <Input
                ref={input => {
                  this.entityName = input;
                }}
                className={classnames({
                  [s.input]: true,
                  [s2['adentity-name-input']]: true,
                  // [s.error]: nameConflict || showAppNameError,
                })}
                value={styleName}
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
          <div
            className={classnames({
              [s2['setting__body_item']]: true,
            })}
            style={{ paddingTop: 6 }}
          >
            <div className={s2['setting__body_item__name']}>推广标的类型</div>
            <div className={s2['setting__body_item__value']}>
              <RadioGroup
                size="large"
                value={objectType}
                onChange={this.onOsTypeChange}
              >
                {objectTypes}
              </RadioGroup>
            </div>
          </div>
          <div className={s2['setting__body_item']}>
            <div className={s2['setting__body_item__name']}>
              可兼容的最低版本号 {appVersionTip}
            </div>
            <div className={s2['setting__body_item__value']}>
              <Input
                ref={input => {
                  this.entityName = input;
                }}
                className={classnames({
                  [s.input]: true,
                  [s2['appVersion-name-input']]: true,
                  // [s.error]: nameConflict || showAppNameError,
                })}
                value={appVersion}
                onChange={this.onAppNameChange}
                onFocus={this.onAppNameFocus}
              />
              <div
                className={classnames({
                  [s['input-hint']]: true,
                  // [s.error]: showAppNameError,
                })}
              >
                此版本及以上旧版本支持该样式
              </div>
            </div>
          </div>
          <div className={s2.setting__body_elems}>
            <DataGrid
              isAbleAddAndDel={isAbleAddAndDel}
              isAbleEdit={isAbleEdit}
              elemType="图片元素"
              elemItems={pictureElems}
              // elemsMapKey={}
              elems={pictures}
              elemsMapKey={pictureElemsMapKey} // 这四项的值需要改
              elemsMapRatio={pictureElemsMapKey}
              elemsMapSize={pictureElemsMapKey}
              elemsMapWordNum={pictureElemsMapKey}
              onNameChange={this.onNameChange}
              onKeyChange={this.onKeyChange}
              onRatioChange={this.onRatioChange}
              onSizeChange={this.onSizeChange}
              onWordNumChange={this.onWordNumChange}
              onAddElem={onAddElem}
              onDelElem={onAddElem}
              adPosType={adPosType}
            />
          </div>
          <div className={s2.setting__body_elems}>
            <DataGrid
              isAbleAddAndDel
              isAbleEdit
              elemType="文字元素"
              // appVersion={appVersion}
              elemItems={textElems}
              elems={texts}
              elemsMapKey={textElemsMapKey}
              onNameChange={this.onNameChange}
              onKeyChange={this.onKeyChange}
              onRatioChange={this.onRatioChange}
              onSizeChange={this.onSizeChange}
              onWordNumChange={this.onWordNumChange}
              onAddElem={onAddElem}
              onDelElem={onAddElem}
              adPosType={adPosType}
            />
          </div>
          {/* <div className={s2.setting__body_elems}>
            <DataGrid
              isAbleAdd
              isAbleEdit
              isAbleDel
              elemType="视频链接元素"
              // appVersion={appVersion}
              elemsMapKey={videoElems}
              elems={videos}
            />
          </div> */}
        </div>
      </div>
    );
  }
}

export default withStyles(s2)(AdPosStyle);
