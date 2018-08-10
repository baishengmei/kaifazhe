/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Table, Dropdown, Menu, Icon, message } from 'antd';
import s from './index.css';
import {
  styleElemName,
  pictureElemsMapKey,
  textElemsMapKey,
  videoElemsMapKey,
  AdPosObject,
} from '../../../../constants/MenuTypes';
import Columns from './Columns';

const getElemItemsMenu = (elemItems, onChooseElemItems) => (
  <Menu>
    {elemItems.map(t => {
      return (
        <Menu.Item key={t.toString()}>
          <span onClick={onChooseElemItems} role="presentation">
            {t}
          </span>
        </Menu.Item>
      );
    })}
  </Menu>
);

const getColumns = (
  elemType, // 图片元素、文字元素、视频元素之一
  isAbleAddAndDel,
  isAbleEdit,
  elemItems, // 添加元素的类型，包括自定义
  elemsMapKey, // 元素与key组合
  elemsMapRatio, // 元素与比例组合
  elemsMapSize, // 元素与尺寸组合
  elemsMapWordNum, // 元素与字数组合
  onNameChange, // 元素名改变时
  onKeyChange, // 元素Key改变时
  onRatioChange, // 比例改变时
  onSizeChange, // 尺寸改变时
  onWordNumChange, // 字数改变时
  onAddElem, // 添加元素时
  onDelElem, // 删除元素时
  adPosType, // 广告位类型
) => {
  switch (elemType) {
    case styleElemName[0]:
      return [
        Columns.elemName(isAbleAddAndDel, elemType, onNameChange),
        Columns.elemKey(isAbleAddAndDel, elemType, onKeyChange),
        Columns.ratio(isAbleAddAndDel, onRatioChange),
        Columns.size(isAbleAddAndDel, onSizeChange),
        Columns.operate(onDelElem),
      ];
    case styleElemName[1]:
      return [
        Columns.elemName,
        Columns.elemKey,
        Columns.wordNum,
        Columns.operate,
      ];
    case styleElemName[2]:
      return [Columns.elemName, Columns.elemKey, Columns.wordNum];
  }
};

class DataGrid extends React.Component {
  static propTypes = {
    isAbleAddAndDel: PropTypes.bool.isRequired,
    isAbleEdit: PropTypes.bool.isRequired,
    elemType: PropTypes.string.isRequired,
    elemItems: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    elemsMapKey: PropTypes.shape({}).isRequired,
    elemsMapRatio: PropTypes.shape({}).isRequired,
    elemsMapSize: PropTypes.shape({}).isRequired,
    elemsMapWordNum: PropTypes.shape({}).isRequired,
    onNameChange: PropTypes.func.isRequired,
    onKeyChange: PropTypes.func.isRequired,
    onRatioChange: PropTypes.func.isRequired,
    onSizeChange: PropTypes.func.isRequired,
    onWordNumChange: PropTypes.func.isRequired,
    onAddElem: PropTypes.func,
    onDelElem: PropTypes.func.isRequired,
    elems: PropTypes.arrayOf(PropTypes.object),
    adPosType: PropTypes.string.isRequired,
  };

  static defaultProps = {
    onAddElem: null,
    elems: [],
  };

  constructor(props) {
    super(props);
    const {
      isAbleAddAndDel,
      isAbleEdit,
      elemType,
      elemItems,
      elemsMapKey,
      elemsMapRatio,
      elemsMapSize,
      elemsMapWordNum,
      onNameChange,
      onKeyChange,
      onRatioChange,
      onSizeChange,
      onWordNumChange,
      onAddElem,
      onDelElem,
      elems,
      adPosType,
    } = this.props;
    this.state = {
      elems,
      elemType,
      elemItems,
      adPosType,
      columns: getColumns(
        elemType,
        isAbleAddAndDel,
        isAbleEdit,
        elemItems,
        elemsMapKey,
        elemsMapRatio,
        elemsMapSize,
        elemsMapWordNum,
        onNameChange,
        onKeyChange,
        onRatioChange,
        onSizeChange,
        onWordNumChange,
        onAddElem,
        this.onDelElem,
        adPosType,
      ),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      elems: nextProps.elems,
    });
  }

  onDelElem = record => {
    console.info(record.key, record.key === 0, '删除了什么');
    const newElems = [...this.state.elems];
    newElems.splice(record.key, 1);
    this.props.onDelElem(this.state.elemType, [...newElems]);
  };

  onChooseElemItems = e => {
    const { elemType, adPosType, elems } = this.state;
    const newItemName = e.target.innerText;
    const elemsMapKeys = [
      pictureElemsMapKey,
      textElemsMapKey,
      videoElemsMapKey,
    ];
    // 图片元素、文字元素、视频元素的索引分别对应0，1，2
    const styleElemIndex = styleElemName.findIndex(t => t === elemType);
    const elemsMapKey = elemsMapKeys[styleElemIndex];

    // 判断添加元素是否为标准元素，-1为自定义，其他为标准元素
    const newItemIndex = Object.keys(elemsMapKey).findIndex(
      t => t === newItemName,
    );
    let newItem = {};
    // 判断该标准元素是否已经被添加了
    elems.find(t => t.elemName === newItemName);
    if (
      (newItemIndex > -1 &&
        elems.findIndex(t => t.elemName === newItemName) === -1) ||
      newItemIndex === -1
    ) {
      newItem = {
        elemName: newItemIndex > -1 ? newItemName : '',
        elemKey: newItemIndex > -1 ? elemsMapKey[newItemName] : '',
      };
      if (styleElemIndex === 0) {
        newItem = {
          ...newItem,
          ratio: '',
          attr: {
            width: 0,
            height: 0,
          },
          isStandard: adPosType !== AdPosObject[7] && newItemName !== '自定义',
        };
      } else if (styleElemIndex === 1) {
        newItem = {
          attr: 0,
          isStandard: adPosType !== AdPosObject[7] && newItemName !== '自定义',
        };
      } else {
        newItem = {
          attr: 1000,
        };
      }
      this.props.onAddElem(elemType, this.state.elems.concat(newItem));
    } else {
      message.warning(`${elemType}"${newItemName}"不可重复添加！`);
    }
  };

  render() {
    const { elemType, elems, elemItems, columns } = this.state;
    const list = elems.map((t, i) =>
      Object.assign({}, t, { operate: '删除' }, { key: i }),
    );
    if (elemType === styleElemName[0]) {
      return (
        <Table
          columns={columns}
          dataSource={list}
          bordered
          // title={() => (
          //   <div>
          //     <Icon type="plus-circle" />
          //     <span>添加{elemType}</span>
          //   </div>
          // )}
          title={() => (
            <Dropdown
              overlay={getElemItemsMenu(elemItems, this.onChooseElemItems)}
              trigger={['click']}
            >
              <span className="ant-dropdown-link">
                <Icon type="plus-circle" />
                <span>添加{elemType}</span>
              </span>
            </Dropdown>
          )}
        />
      );
    } else if (elemType === styleElemName[1]) {
      return <div>文字元素表格</div>;
    } else if (elemType === styleElemName[2]) {
      return <div>图片元素表格</div>;
    }
    // return (
    //   <Table
    //     columns={columns}
    //     dataSource={data}
    //     bordered
    //     title={() => 'Header'}
    //   />
    // );
  }
}

export default withStyles(s)(DataGrid);
