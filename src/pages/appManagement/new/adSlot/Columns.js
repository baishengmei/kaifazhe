import React from 'react';
import { Input, Select, Icon } from 'antd';
import s from './index.css';
import {
  pictureElemsMapKey,
  textElemsMapKey,
  videoElemsMapKey,
  pictureElemRatio,
  elemsWordNum,
  styleElemName,
  AdPosObject,
} from '../../../../constants/MenuTypes';
import heightMonitor from '../../../../../public/images/ic_add_subtract_grey.png';
import heightMonitorUp from '../../../../../public/images/ic_add_subtract_blue_up.png';
import heightMonitorDown from '../../../../../public/images/ic_add_subtract_blue_down.png';
import { classnames } from '../../../../core/utils';

const { Option } = Select;

const ratioRatioItems = Object.keys(pictureElemRatio).map(t => (
  <Option key={t.toString()} value={t.toString()}>
    {t}
  </Option>
));

const wordNumRatioItems = elemKey => {
  return elemsWordNum[elemKey].map(t => (
    <Option key={t.toString()} value={t}>
      {t}
    </Option>
  ));
};

const Columns = {
  elemName: (elems, isAbleEdit, elemType, onNameChange) => ({
    title: '元素名',
    key: 'elemName',
    className: s.elemName,
    render: record => {
      if (elemType === styleElemName[2]) {
        return <span>{Object.keys(videoElemsMapKey)[0]}</span>;
      }
      if (record.isStandard || !isAbleEdit) {
        return <span>{record.elemName}</span>;
      }
      return (
        <Input
          value={record.elemName}
          className={classnames({ [s.error]: !record.nameValid })}
          onChange={e => {
            const { value } = e.target;
            const isValid = !(
              Object.keys(pictureElemsMapKey)
                .slice(0, 7)
                .indexOf(value) > -1 ||
              elems.findIndex(t => t.elemName === value) > -1
            );
            onNameChange(
              'elemName',
              value,
              record.key,
              isValid,
              record.keyValid,
            );
          }}
        />
      );
    },
  }),
  elemKey: (elems, isAbleEdit, elemType, onKeyChange) => ({
    title: '元素Key',
    key: 'elemKey',
    className: s.elemKey,
    render: record => {
      if (elemType === styleElemName[2] || record.isStandard || !isAbleEdit) {
        return (
          <span>
            {
              Object.assign(
                {},
                pictureElemsMapKey,
                textElemsMapKey,
                videoElemsMapKey,
              )[record.elemName]
            }
          </span>
        );
      }
      return (
        <Input
          value={record.elemKey}
          className={classnames({ [s.error]: !record.keyValid })}
          onChange={e => {
            const { value } = e.target;
            const isValid = !(
              Object.values(pictureElemsMapKey)
                .slice(0, 7)
                .indexOf(value) > -1 ||
              elems.findIndex(t => t.elemKey === value) > -1
            );
            onKeyChange(
              'elemKey',
              value,
              record.key,
              record.nameValid,
              isValid,
            );
          }}
        />
      );
    },
  }),
  ratio: (isAbleEdit, onRatioChange) => ({
    title: '比例',
    key: 'ratio',
    className: s.ratio,
    render: record => {
      if (isAbleEdit) {
        // 这个地方需要判断的是审核状态
        return (
          <Select
            style={{ width: 80 }}
            value={record.ratio}
            onChange={value => onRatioChange('ratio', value, record.key)}
          >
            {ratioRatioItems}
          </Select>
        );
      }
      return <span>{record.ratio}</span>;
    },
  }),
  size: (isAbleEdit, onSizeChange) => ({
    title: '尺寸',
    key: 'size',
    className: s.size,
    render: record => {
      const { width, height, sizeMonitor } = record.attr;
      const ratioArr = record.ratio.split(':');
      const ratio = parseInt(ratioArr[0]) / parseInt(ratioArr[1]);
      const maxHeight = parseInt(
        ((width / ratio).toFixed(0) * 1.05).toFixed(0),
      );
      const minHeight = parseInt(
        ((width / ratio).toFixed(0) * 0.95).toFixed(0),
      );
      const sizeMonitorIcon =
        sizeMonitor === 'up'
          ? heightMonitorUp
          : sizeMonitor === 'down' ? heightMonitorDown : heightMonitor;
      if (isAbleEdit) {
        return (
          <div style={{ margin: '0 auto' }}>
            宽<Input
              style={{ width: 62, marginLeft: 4 }}
              value={record.attr.width}
              onChange={e =>
                onSizeChange(
                  'attr',
                  {
                    width: e.target.value,
                    height: (
                      parseInt(e.target.value) /
                      (parseInt(record.ratio.split(':')[0]) /
                        parseInt(record.ratio.split(':')[1]))
                    ).toFixed(0),
                    sizeMonitor: '',
                  },
                  record.key,
                )
              }
            />
            &nbsp;&nbsp; 高<div className={s.sizeMonitor}>
              <Input
                style={{ width: 62, marginLeft: 4 }}
                value={record.attr.height}
                onChange={() => {}}
              />
              <img
                src={sizeMonitorIcon}
                alt=""
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '9px',
                  pointerEvents: 'none',
                }}
              />
              <span
                className={s.up}
                onClick={() => {
                  if (parseInt(height) < maxHeight) {
                    onSizeChange(
                      'attr',
                      {
                        width,
                        height: parseInt(height) + 1,
                        sizeMonitor: 'up',
                      },
                      record.key,
                    );
                  }
                }}
                onKeyDown={() => {}}
                role="none"
              />
              <span
                className={s.down}
                onClick={() => {
                  if (parseInt(height) > minHeight) {
                    onSizeChange(
                      'attr',
                      {
                        width,
                        height: parseInt(height) - 1,
                        sizeMonitor: 'down',
                      },
                      record.key,
                    );
                  }
                }}
                onKeyDown={() => {}}
                role="none"
              />
            </div>
          </div>
        );
      }
      return (
        <div style={{ margin: '0 auto' }}>
          宽 {record.attr.width}
          &nbsp;&nbsp; 高 {record.attr.height}
        </div>
      );
    },
  }),
  wordNum: (isAbleEdit, onWordNumChange) => ({
    title: '字数',
    key: 'wordNum',
    className: s.wordNum,
    render: record => {
      if (!isAbleEdit) {
        return <span>{record.attr}以内</span>;
      }
      if (!record.isStandard) {
        return (
          <div className={s.wordWrap}>
            <Input />
            <span className={s.wordTip}>以内</span>
          </div>
        );
      }
      return (
        <div className={s.wordWrap}>
          <Select
            style={{ width: 80 }}
            defaultValue={record.attr}
            onChange={value => onWordNumChange('attr', value, record.key)}
          >
            {wordNumRatioItems(record.elemKey)}
          </Select>
          <span className={s.wordTip}>以内</span>
        </div>
      );
    },
  }),
  operate: onDelElem => ({
    title: '删除',
    key: 'operate',
    className: s.operate,
    render: record => (
      <div
        onClick={() => onDelElem(record)}
        onKeyDown={() => onDelElem(record)}
        role="presentation"
      >
        删除
      </div>
    ),
  }),
};

export default Columns;
