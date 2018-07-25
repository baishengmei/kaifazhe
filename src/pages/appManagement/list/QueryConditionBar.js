import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Select, Input } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
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

const queryConditionParams = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

class QueryConditionBar extends Component {
  static propTypes = {
    tabType: PropTypes.oneOf(Object.keys(AppTabTypes)).isRequired,
    keyword: PropTypes.string.isRequired,
    selectedOsType: queryConditionParams,
    selectedStatus: queryConditionParams,
    selectedOperateStatus: queryConditionParams,
    selectedAuditStatus: queryConditionParams,
    selectedObject: queryConditionParams,
    onSearch: PropTypes.func.isRequired,
    onOsTypeChange: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    onAuditStatusChange: PropTypes.func.isRequired,
    onObjectChange: PropTypes.func.isRequired,
    onOperateStatusChange: PropTypes.func.isRequired,
    selectedRowKeys: PropTypes.arrayOf(PropTypes.number).isRequired,
    selectedRows: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMultipleOperation: PropTypes.func.isRequired,
    onCreateEntity: PropTypes.func.isRequired,
  };
  static defaultProps = {
    selectedOsType: null,
    selectedStatus: null,
    selectedAuditStatus: null,
    selectedObject: null,
    selectedOperateStatus: null,
  };

  constructor(props) {
    super(props);
    const {
      tabType,
      keyword,
      selectedOsType,
      selectedStatus,
      selectedOperateStatus,
      selectedAuditStatus,
      selectedObject,
      selectedRowKeys,
      selectedRows,
    } = props;
    this.state = {
      tabType,
      keyword,
      selectedOsType,
      selectedStatus,
      selectedOperateStatus,
      selectedAuditStatus,
      selectedObject,
      selectedRowKeys,
      selectedRows,
    };

    this.componentWillReceiveProps = updateComponentStateByKeys([
      'tabType',
      'keyword',
      'selectedOsType',
      'selectedStatus',
      'selectedOperateStatus',
      'selectedAuditStatus',
      'selectedObject',
      'selectedRowKeys',
      'selectedRows',
    ]);
    this.shouldComponentUpdate = componentUpdateByState;
  }

  onSearchInputChange = e => {
    this.setState({
      keyword: e.target.value,
    });
  };

  onSearch = value => {
    this.props.onSearch(value.replace(/^\s+|\s+$/g, ''));
  };

  onOsTypeChange = value => {
    const osType = AppOsTypes.find(it => it.value === value);
    this.props.onOsTypeChange(osType);
  };

  onStatusChange = value => {
    const status = AppAdposStatus.find(it => it.value === value);
    this.props.onStatusChange(status);
  };

  onOperateStatusChange = value => {
    const operateStatus = AppAdposStatus.find(it => it.value === value);
    this.props.onOperateStatusChange(operateStatus);
  };

  onAuditStatusChange = value => {
    const auditStatus = AdPosAuditStatus.find(it => it.value === value);
    this.props.onAuditStatusChange(auditStatus);
  };

  onObjectChange = value => {
    const object = AdPosObject.find(it => it.value === value);
    this.props.onObjectChange(object);
  };

  queryCondition = (
    tabType,
    selectedOsType,
    selectedStatus,
    selectedOperateStatus,
    selectedAuditStatus,
    selectedObject,
  ) =>
    tabType === AppTabTypes.appTab ? (
      <div className={s.queryCondition}>
        <div className={s.select}>
          <span className={s.label}>平台：</span>
          <Select
            value={selectedOsType.name}
            style={selectStyle}
            onChange={this.onOsTypeChange}
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
            value={selectedStatus.name}
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
      </div>
    ) : (
      <div className={s.queryCondition}>
        <div className={s.select}>
          <span className={s.label}>操作状态：</span>
          <Select
            value={selectedOperateStatus.name}
            style={selectStyle}
            onChange={this.onOperateStatusChange}
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
            value={selectedAuditStatus.name}
            style={selectStyle}
            onChange={this.onAuditStatusChange}
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
            value={selectedObject.name}
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
    const { onMultipleOperation, onCreateEntity } = this.props;
    const {
      tabType,
      keyword,
      selectedOsType,
      selectedStatus,
      selectedOperateStatus,
      selectedAuditStatus,
      selectedObject,
      selectedRowKeys,
      selectedRows,
    } = this.state;
    return (
      <div className={s.queryConditionBar}>
        {tabType !== AppTabTypes.adPosTab && (
          <Button className={s.newBtn} onClick={onCreateEntity}>
            {BtnText[tabType]}
          </Button>
        )}
        {this.queryCondition(
          tabType,
          selectedOsType,
          selectedStatus,
          selectedOperateStatus,
          selectedAuditStatus,
          selectedObject,
        )}
        <MultipleOperationMenu
          tabType={tabType}
          // dataListStatus={dataListStatus}
          selectedRowKeys={selectedRowKeys}
          selectedRows={selectedRows}
          onMultipleOperation={onMultipleOperation}
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

export default withStyles(s)(QueryConditionBar);
