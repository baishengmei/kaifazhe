import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon, Radio } from 'antd';
import s from '../index.css';
import s2 from './index.css';
import { AdPosObject, flowStyleItems } from '../../../../constants/MenuTypes';
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

/* eslint-disable react/no-unused-prop-types */
class StyleInfo extends Component {
  static propTypes = {
    styleInfo: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    adPosType: PropTypes.string.isRequired,
    onAddElem: PropTypes.func,
  };

  static defaultProps = {
    onAddElem: null,
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

  flowInfoStyleType = () => (
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
          value={this.state.adPosType}
          onChange={this.onOsTypeChange} // 这里触发函数改变flowInfoStyleType这个store里的值
        >
          {adPosTypeItems}
        </RadioGroup>
      </div>
    </div>
  );

  render() {
    const { adPosType, styleInfo } = this.state;
    const { onAddElem } = this.props;
    return (
      <div className={s.setting}>
        <div className={s.setting__title}>样式信息</div>
        {styleInfo.map((sty, index) => {
          return (
            <div key={index.toString()}>
              <div className={s2.setting__body}>
                {
                  /* 广告位类型为信息流时，显示“添加样式” */
                  (adPosType === AdPosObject,
                  flowStyleItems[1].name && this.flowInfoStyleType())
                }
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
                  pictures={sty.pictures}
                  pictureElems={sty.pictureElems}
                  texts={sty.texts}
                  textElems={sty.textElems}
                  videos={sty.videos}
                  videoElems={sty.videoElems}
                  onAddElem={(elemType, elemValue) => {
                    this.onAddElem(elemType, elemValue, index);
                  }}
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
          <Icon type="plus-circle" />
          继续添加样式
        </div>
      </div>
    );
  }
}

export default withStyles(s2)(StyleInfo);
