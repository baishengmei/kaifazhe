import React from 'react';
import { Input, Select } from 'antd';
import s from './index.css';
import {
  pictureElemsMapKey,
  textElemsMapKey,
  videoElemsMapKey,
  pictureElemRatio,
  styleElemName,
  AdPosObject,
} from '../../../../constants/MenuTypes';

const { Option } = Select;

const ratioItems = Object.keys(pictureElemRatio).map(t => (
  <Option key={t.toString} value={t}>
    {t}
  </Option>
));

const Columns = {
  elemName: (isAbleAddAndDel, elemType, onNameChange) => ({
    title: '元素名',
    key: 'elemName',
    className: s.elemName,
    render: record => {
      if (elemType === styleElemName[2]) {
        return <span>{Object.keys(videoElemsMapKey)[0]}</span>;
      }
      // if (adPosType === AdPosObject[7]) {
      //   return <Input value={record.elemName} onChange={onNameChange} />;
      // }
      if (record.isStandard) {
        return <span>{record.elemName}</span>;
      }
      return <Input value={record.elemName} onChange={onNameChange} />;
    },
  }),
  elemKey: (type, onChange) => ({
    title: '元素Key',
    key: 'elemKey',
    className: s.elemKey,
    render: record => {
      if (record.type !== '自定义') {
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
      return <Input value={record.elemName} onChange={onChange} />;
    },
  }),
  ratio: (type, onChange) => ({
    title: '比例',
    key: 'ratio',
    className: s.ratio,
    render: record => {
      if (record.type !== '自定义') {
        // 这个地方需要判断的是审核状态
        return (
          <Select style={{ width: 120 }} onChange={onChange}>
            {ratioItems}
          </Select>
        );
      }
    },
  }),
  size: (type, onChange) => ({
    title: '尺寸',
    key: 'size',
    className: s.size,
    render: record => {
      if (record.type !== '自定义') {
        return (
          <div onChange={onChange} style={{ margin: '0 auto' }}>
            宽<Input
              style={{ width: 62, marginLeft: 4 }}
              value={record.attr.width}
            />
            &nbsp;&nbsp; 高<Input
              style={{ width: 62, marginLeft: 4 }}
              value={record.attr.height}
            />
          </div>
        );
      }
    },
  }),
  wordNum: () => ({
    title: '字数',
    key: 'wordNum',
    className: s.wordNum,
    render: record => {
      if (record.type !== '自定义') {
        return <span>{record.attr}</span>;
      }
      return <Select>{ratioItems}</Select>;
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
