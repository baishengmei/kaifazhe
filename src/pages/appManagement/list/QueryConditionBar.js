import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Select, Input } from 'antd';
import s from './index.css';
import {
  AppTabTypes,
  AppOsTypes,
  AppAdposStatus,
  AdPosAuditStatus,
  AdPosObject,
} from '../../../constants/MenuTypes';
import MultipleOperationMenu from './MultipleOperationMenu';
import {
  updateComponentStateByKeys,
  componentUpdateByState,
} from '../../../core/utils';

const { Option } = Select;
// const Option = Select.Option;
const { Search } = Input;

const { appTab, appAdPosTab } = AppTabTypes;
const BtnText = {
  [appTab]: '新建应用',
  [appAdPosTab]: '新建广告位',
};

const selectStyle = {
  width: 110,
};
const searchInputStyle = {
  width: 200,
  float: 'right',
};

class QueryConditionBar extends Component {
  static propTypes = {
    tabType: PropTypes.oneOf(Object.keys(AppTabTypes)).isRequired,
    keyword: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { tabType, keyword } = props;
    this.state = {
      tabType,
      keyword,
    };

    this.componentWillReceiveProps = updateComponentStateByKeys([
      'tabType',
      'keyword',
    ]);
    this.shouldComponentUpdate = componentUpdateByState;
  }

  onSearchInputChange = e => {
    this.setState({
      keyword: e.target.value,
    });
  };

  onSearch = value => {
    this.props.onSearch(this.state.tabType, value.replace(/^\s+|\s+$/g, ''));
  };

  queryCondition = tabType =>
    tabType === AppTabTypes.appTab ? (
      <div className={s.queryCondition}>
        <div className={s.select}>
          <span className={s.label}>平台：</span>
          <Select
            value="不限"
            style={selectStyle}
            onChange={this.onStatusChange}
          >
            {AppOsTypes.map(x => (
              <Option key={x.value} value={x.value}>
                {x.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className={s.select}>
          <span className={s.label}>状态：</span>
          <Select
            value="不限"
            style={selectStyle}
            onChange={this.onObjectChange}
          >
            {AppAdposStatus.map(x => (
              <Option key={x.value} value={x.value}>
                {x.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    ) : (
      <div className={s.queryCondition}>
        <div className={s.select}>
          <span className={s.label}>操作状态：</span>
          <Select
            value="不限"
            style={selectStyle}
            onChange={this.onStatusChange}
          >
            {AppAdposStatus.map(x => (
              <Option key={x.value} value={x.value}>
                {x.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className={s.select}>
          <span className={s.label}>审核状态：</span>
          <Select
            value="不限"
            style={selectStyle}
            onChange={this.onObjectChange}
          >
            {AdPosAuditStatus.map(x => (
              <Option key={x.value} value={x.value}>
                {x.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className={s.select}>
          <span className={s.label}>广告位类型：</span>
          <Select
            value="不限"
            style={selectStyle}
            onChange={this.onObjectChange}
          >
            {AdPosObject.map(x => (
              <Option key={x.value} value={x.value}>
                {x.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    );

  render() {
    const { tabType, keyword } = this.state;
    return (
      <div className={s.queryConditionBar}>
        {tabType !== AppTabTypes.adPosTab && (
          <Button className={s.newBtn} onClick={this.onCreateAdEntity}>
            {BtnText[tabType]}
          </Button>
        )}
        {this.queryCondition(tabType)}
        <MultipleOperationMenu
          tabType={tabType}
          // dataListStatus={dataListStatus}
          // selectedRowKeys={selectedRowKeys}
          // selectedRows={selectedRows}
          // onMultipleOperation={onMultipleOperation}
        />
        <Search
          value={keyword}
          placeholder="请输入查询关键词"
          style={searchInputStyle}
          onChange={this.onSearchInputChange}
          onSearch={this.onSearch}
        />
      </div>
    );
  }
}

export default QueryConditionBar;
