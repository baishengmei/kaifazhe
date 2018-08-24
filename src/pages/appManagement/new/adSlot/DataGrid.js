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
  AdPosObject,
  defaultElemsInfo,
  pictureElemRatio,
  flowStyleItems,
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
  elems,
  elemType, // 图片元素、文字元素、视频元素之一
  isAbleAddAndDel,
  isAbleEdit,
  elemItems, // 添加元素的类型，包括自定义
  elemsMapKey, // 元素与key组合
  onElemInfoItemChange, // 元素名、元素key、比例、尺寸、字数
  onAddElem, // 添加元素时
  onDelElem, // 删除元素时
  adPosType, // 广告位类型
) => {
  const operateRow = Columns.operate(onDelElem);
  switch (elemType) {
    case styleElemName[0]: {
      const table = [
        Columns.elemName(elems, isAbleEdit, elemType, onElemInfoItemChange),
        Columns.elemKey(elems, isAbleEdit, elemType, onElemInfoItemChange),
        Columns.ratio(isAbleEdit, onElemInfoItemChange),
        Columns.size(isAbleEdit, onElemInfoItemChange),
      ];
      isAbleAddAndDel && table.push(operateRow);
      return table;
    }
    case styleElemName[1]: {
      const table = [
        Columns.elemName(
          elems,
          isAbleAddAndDel,
          elemType,
          onElemInfoItemChange,
        ),
        Columns.elemKey(elems, isAbleAddAndDel, elemType, onElemInfoItemChange),
        Columns.wordNum(isAbleEdit, onElemInfoItemChange),
      ];
      isAbleAddAndDel && table.push(operateRow);
      return table;
    }
    case styleElemName[2]:
      return [
        Columns.elemName(elems, false, elemType, onElemInfoItemChange),
        Columns.elemKey(elems, false, elemType, onElemInfoItemChange),
        Columns.wordNum(false, onElemInfoItemChange),
      ];
  }
};

class DataGrid extends React.Component {
  static propTypes = {
    isAbleAddAndDel: PropTypes.bool.isRequired,
    isAbleEdit: PropTypes.bool.isRequired,
    elemType: PropTypes.string.isRequired,
    elemItems: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    elemsMapKey: PropTypes.shape({}).isRequired,
    onAddElem: PropTypes.func,
    onDelElem: PropTypes.func,
    elems: PropTypes.arrayOf(PropTypes.object),
    adPosType: PropTypes.string.isRequired,
    flowInfoStyleType: PropTypes.string,
    onElemInfoItemChange: PropTypes.func,
  };

  static defaultProps = {
    onAddElem: null,
    onDelElem: null,
    elems: [],
    flowInfoStyleType: null,
    onElemInfoItemChange: null,
  };

  constructor(props) {
    super(props);
    const {
      isAbleAddAndDel,
      isAbleEdit,
      elemType,
      elemItems,
      elemsMapKey,
      onAddElem,
      elems,
      adPosType,
      flowInfoStyleType,
    } = this.props;
    this.state = {
      elems,
      elemType,
      elemItems,
      adPosType,
      elemsMapKey,
      flowInfoStyleType,
      isAbleAddAndDel,
      columns: getColumns(
        elems,
        elemType,
        isAbleAddAndDel,
        isAbleEdit,
        elemItems,
        elemsMapKey,
        this.onElemInfoItemChange,
        onAddElem,
        this.onDelElem,
        adPosType,
      ),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      elems,
      elemItems,
      flowInfoStyleType,
      adPosType,
      elemType,
      isAbleAddAndDel,
    } = nextProps;
    const newElems = this.checkElemsIsCreate(elems, elemItems);
    if (elemItems !== newElems) {
      this.setState({
        elemItems: newElems,
      });
    }
    this.setState({
      elems,
      flowInfoStyleType,
      adPosType,
      elemType,
      isAbleAddAndDel,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      elems,
      elemType,
      elemItems,
      adPosType,
      flowInfoStyleType,
      isAbleAddAndDel,
    } = this.props;
    const { columns } = this.state;
    return (
      elems !== nextProps.elems ||
      elemType !== nextProps.elemType ||
      elemItems !== nextProps.elemItems ||
      adPosType !== nextProps.adPosType ||
      flowInfoStyleType !== nextProps.flowInfoStyleType ||
      columns !== nextState.columns ||
      isAbleAddAndDel !== nextProps.isAbleAddAndDel
    );
  }

  onElemInfoItemChange = (itemType, itemValue, index, nameValid, keyValid) => {
    const { elems } = this.state;
    const newElems = [...elems];
    newElems[index][itemType] = itemValue;
    if (itemType === 'ratio') {
      newElems[index]['attr'] = {
        width: pictureElemRatio[itemValue][0],
        height: pictureElemRatio[itemValue][1],
      };
    }
    newElems[index]['nameValid'] = nameValid;
    newElems[index]['keyValid'] = keyValid;
    this.props.onElemInfoItemChange(newElems);
  };

  onDelElem = record => {
    console.info(record.key, record.key === 0, '删除了什么');
    const newElems = [...this.state.elems];
    newElems.splice(record.key, 1);
    this.props.onDelElem(this.state.elemType, [...newElems]);
  };

  onChooseElemItems = e => {
    const {
      elemType,
      adPosType,
      elems,
      elemsMapKey,
      flowInfoStyleType,
    } = this.state;
    const newItemName = e.target.innerText;

    // 图片元素、文字元素、视频元素的索引分别对应0，1，2
    const styleElemIndex = styleElemName.findIndex(t => t === elemType);

    // 判断添加元素是否为标准元素，true为自定义，false为标准元素
    const newItemIsCustom = newItemName === '自定义';

    //样式类型为信息流时，分为小图、大图等，否则等于广告位类型
    const styleTypeValue =
      adPosType === AdPosObject[1].value ? flowInfoStyleType : adPosType;
    const styleType = [...AdPosObject.slice(2, 8), ...flowStyleItems].find(
      t => t.value === styleTypeValue,
    ).name;

    let newItem = {};
    if (
      (!newItemIsCustom &&
        elems.findIndex(t => t.elemName === newItemName) === -1) ||
      newItemIsCustom
    ) {
      newItem = {
        elemName: !newItemIsCustom ? newItemName : '',
        elemKey: elemsMapKey[newItemName],
        nameValid: true,
        keyValid: true,
      };
      if (styleElemIndex === 0) {
        const pictureElem = defaultElemsInfo[styleType].pictures.find(
          t => t.elemName === newItemName,
        );

        newItem = {
          ...newItem,
          ratio: pictureElem ? pictureElem.ratio : '',
          attr: {
            width: pictureElem ? pictureElemRatio[pictureElem.ratio][0] : '',
            height: pictureElem ? pictureElemRatio[pictureElem.ratio][1] : '',
          },
          isStandard: adPosType !== AdPosObject[7] && newItemName !== '自定义',
        };
      } else if (styleElemIndex === 1) {
        const textElem = defaultElemsInfo[styleType].texts.find(
          t => t.elemName === newItemName,
        );
        newItem = {
          ...newItem,
          attr: textElem ? textElem.attr : '',
          isStandard: adPosType !== AdPosObject[7] && newItemName !== '自定义',
        };
      } else {
        newItem = {
          ...newItem,
          attr: 1000,
        };
      }
      this.props.onAddElem(elemType, this.state.elems.concat(newItem));
    } else {
      message.warning(`${elemType}"${newItemName}"不可重复添加！`);
    }
  };

  checkElemsIsCreate = (elems, elemItems) => {
    const elemsNames = elems.map(t => t.elemName);
    let newElems = [];
    elemItems.forEach(t => {
      elemsNames.findIndex(n => n === t) === -1 && newElems.push(t);
    });
    if (!newElems.find(t => t === '自定义')) {
      newElems.push('自定义');
    }
    return newElems;
  };

  render() {
    const { elemType, elems, elemItems, columns, isAbleAddAndDel } = this.state;
    const list = elems.map((t, i) =>
      Object.assign({}, t, { operate: '删除' }, { key: i }),
    );
    return (
      <Table
        columns={columns}
        dataSource={list}
        bordered
        title={() =>
          !isAbleAddAndDel ? (
            <span className={s.tableTitle} disabled>
              {elemType}
            </span>
          ) : (
            <Dropdown
              overlay={getElemItemsMenu(elemItems, this.onChooseElemItems)}
              trigger={['click']}
            >
              <span className="ant-dropdown-link">
                <Icon type="plus-circle" />
                <span>添加{elemType}</span>
              </span>
            </Dropdown>
          )
        }
      />
    );
  }
}

export default withStyles(s)(DataGrid);
