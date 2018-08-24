import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon, Radio } from 'antd';
import s from '../index.css';
import s2 from './index.css';
import {
  AdPosObject,
  flowStyleItems,
  defaultElemsInfo,
  defaultStyleInfo,
} from '../../../../constants/MenuTypes';
import {
  classnames,
  updateComponentStateByKeys,
  componentUpdateByState,
} from '../../../../core/utils';
import AdPosStyle from './AdPosStyle';

const { Group: RadioGroup } = Radio;

const adPosTypeItems = flowStyleItems.map(t => (
  <Radio className={s.radio} key={t.value} value={t.value}>
    {t.name}
  </Radio>
));

// 校验的四点：
// 1. 样式名称不能为空
// 2. 样式名称校验为true，styleNameValid=true
// 3. 图片元素、文字元素、视频元素不可同时置空；
// 4. 图片元素和文本元素存在时，其校验，即nameValid和keyValid均为true
const checkStyleInfoValidity = styinfo =>
  styinfo.every(
    t =>
      t.styleName.trim() !== '' &&
      t.styleNameValid &&
      (typeof t.videos === 'undefined'
        ? t.pictures.length + t.texts.length > 0
        : t.pictures.length + t.texts.length + t.videos.length > 0) &&
      (t.pictures.length === 0 ||
        (t.pictures.length > 0 &&
          t.pictures.every(p => p.nameValid && p.keyValid))) &&
      (t.texts.length === 0 ||
        (t.texts.length > 0 && t.texts.every(p => p.nameValid && p.keyValid))),
  );

/* eslint-disable react/no-unused-prop-types */
class StyleInfo extends Component {
  static propTypes = {
    styleInfo: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    adPosType: PropTypes.string.isRequired,
    onAddElem: PropTypes.func,
    onAddOrDelStyle: PropTypes.func,
    onFlowInfoTypeChange: PropTypes.func.isRequired,
    onStyleNameChange: PropTypes.func.isRequired,
    onObjectChange: PropTypes.func.isRequired,
    onAppVersionChange: PropTypes.func.isRequired,
    onElemInfoItemChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onAddElem: null,
    onAddOrDelStyle: null,
  };
  constructor(props) {
    super(props);
    const { styleInfo, adPosType } = this.props;
    this.state = {
      styleInfo,
      adPosType,
    };
    this.componentWillReceiveProps = updateComponentStateByKeys([
      'styleInfo',
      'adPosType',
    ]);
    this.shouldComponentUpdate = componentUpdateByState;
  }

  onAddElem = (elemType, elemValue, index) => {
    this.props.onAddElem(elemType, elemValue, index);
  };

  onDelStyle = index => {
    const { styleInfo } = this.state;
    const newStyleInfo = [...styleInfo];
    newStyleInfo.splice(index, 1);
    this.props.onAddOrDelStyle(newStyleInfo);
  };

  addStyle = () => {
    const { styleInfo, adPosType } = this.state;
    const newStyleInfo = [...styleInfo];
    const addNewElems =
      adPosType === AdPosObject[1].value // 若为信息流
        ? defaultElemsInfo['小图']
        : defaultElemsInfo[AdPosObject.find(t => t.value === adPosType).name];
    const addNewStyle = defaultStyleInfo(addNewElems);

    newStyleInfo.push(addNewStyle); // push的内容，需要添加默认值对象，并根据广告位类型或者样式类型进行添加默认值
    this.props.onAddOrDelStyle([...newStyleInfo]);
  };

  flowInfoStyleType = (flowInfoStyleType, index) => (
    <div className={s['setting-item']}>
      <div
        className={classnames({
          [s['setting-item__name']]: true,
          [s['radio']]: true,
        })}
      >
        添加样式
      </div>
      <div
        className={classnames({
          [s['setting-item__value']]: true,
          [s2['setting-item__value']]: true,
        })}
      >
        <RadioGroup
          size="large"
          value={flowInfoStyleType}
          onChange={e => this.props.onFlowInfoTypeChange(e.target.value, index)} // 这里触发函数改变flowInfoStyleType这个store里的值
        >
          {adPosTypeItems}
        </RadioGroup>
      </div>
    </div>
  );

  render() {
    const { adPosType, styleInfo } = this.state;
    const {
      onStyleNameChange,
      onObjectChange,
      onAppVersionChange,
      onElemInfoItemChange,
    } = this.props;
    const newStyleInfo = styleInfo.map((t, i) => {
      t.key = i;
      return t;
    });
    return (
      <div className={s.setting}>
        <div className={s.setting__title}>样式信息</div>
        {newStyleInfo.map((sty, index) => {
          return (
            <div key={index.toString()}>
              <div className={s2.setting__body}>
                {/* 广告位类型为信息流时，显示“添加样式” */
                adPosType === AdPosObject[1].value &&
                  this.flowInfoStyleType(sty.flowInfoStyleType, index)}
                <AdPosStyle
                  styleTitle={
                    adPosType === AdPosObject[1].name
                      ? sty.flowInfoStyleType
                      : adPosType
                  }
                  adPosType={adPosType}
                  auditStatus={sty.auditStatus}
                  styleName={sty.styleName}
                  objectType={sty.objectType}
                  appVersion={sty.appVersion}
                  flowInfoStyleType={sty.flowInfoStyleType}
                  pictures={sty.pictures}
                  pictureElems={sty.pictureElems}
                  texts={sty.texts}
                  textElems={sty.textElems}
                  videos={sty.videos}
                  videoElems={sty.videoElems}
                  onAddElem={(elemType, elemValue) => {
                    this.onAddElem(elemType, elemValue, index);
                  }}
                  onDelStyle={() => this.onDelStyle(index)}
                  isShowDel={styleInfo.length > 1}
                  onStyleNameChange={(value, valid) =>
                    onStyleNameChange(value, valid, index)
                  }
                  onObjectChange={value => onObjectChange(value, index)}
                  onAppVersionChange={value => onAppVersionChange(value, index)}
                  onElemInfoItemChange={(itemType, value) =>
                    onElemInfoItemChange(itemType, value, index)
                  }
                />
              </div>
              <div className={s2.setting__body_image}>
                <img src="../../../../../public/icon.png" alt="测试图片" />
              </div>
              {/* 样式下方的下划线 */}
              {index + 1 !== styleInfo.length && (
                <div className={s2.splitter} />
              )}
            </div>
          );
        })}
        <div className={s2.setting__footer}>
          <Icon type="plus-circle" onClick={this.addStyle} />
          继续添加样式
        </div>
      </div>
    );
  }
}

export { StyleInfo as default, checkStyleInfoValidity };
