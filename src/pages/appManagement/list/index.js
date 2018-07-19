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
import s from './index.css';
import AppTabs from './AppTabs';
import QueryDateRangePicker from './QueryDateRangePicker';
import { AppTabItems } from '../../../constants/MenuTypes';
import QueryConditionBar from './QueryConditionBar';
import AppList, { appListShape } from './AppList';
import history from '../../../history';
import { getAppAdPosPath } from '../../../core/utils';

const singleQueryConditionShape = PropTypes.shape({
  dateRange: PropTypes.object.isRequired,
  keyword: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageNo: PropTypes.number.isRequired,
  selectedStatus: PropTypes.object,
  selectedOsType: PropTypes.object,
  selectedOperateStatus: PropTypes.object,
  selectedAuditStatus: PropTypes.object,
  selectedObject: PropTypes.object,
});
class AppManagement extends React.Component {
  static propTypes = {
    tabType: PropTypes.string.isRequired,
    queryCondition: singleQueryConditionShape.isRequired,
    dataList: appListShape.isRequired,
    appId: PropTypes.number,
    subNav: PropTypes.string.isRequired,
    getAppAndAdposList: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onOsTypeChange: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    onAuditStatusChange: PropTypes.func.isRequired,
    onObjectChange: PropTypes.func.isRequired,
    onDateRangeChange: PropTypes.func.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
    onPageNoChange: PropTypes.func.isRequired,
    onOperateStatusChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    appId: null,
  };

  constructor(props) {
    super(props);
    const { tabType, queryCondition, dataList } = props;
    this.state = {
      tabItems: AppTabItems[tabType],
      queryCondition,
      selectedRowKeys: [],
      dataList,
      tabType,
    };
  }

  componentDidMount() {
    const { appId, subNav } = this.props;
    this.props.getAppAndAdposList(subNav, appId);
  }

  componentWillReceiveProps({ tabType, dataList, queryCondition }) {
    this.setState({
      tabType,
      dataList,
      tabItems: AppTabItems[tabType],
      queryCondition,
    });
  }

  // shouldComponentUpdate(nextProps) {
  //   const { tabType, dataList, appId, subNav } = this.props;
  //   return (
  //     tabType !== nextProps.tabType ||
  //     dataList !== nextProps.dataList ||
  //     appId !== nextProps.appId ||
  //     subNav !== nextProps.subNav
  //   );
  // }

  onTabChange = tabItem => {
    const path = getAppAdPosPath(tabItem);
    history.push(path);
  };

  onDateRangeChange = ranges => {
    const { tabType } = this.state;
    const { appId, subNav } = this.props;
    const dateRange = {
      startDate: ranges[0],
      endDate: ranges[1],
    };
    this.props.onDateRangeChange(tabType, dateRange);
    this.props.getAppAndAdposList(subNav, appId);
  };

  onSearch = keyword => {
    const { tabType } = this.state;
    const { appId, subNav } = this.props;
    this.props.onSearch(tabType, keyword);
    this.props.getAppAndAdposList(subNav, appId);
  };

  onOsTypeChange = osType => {
    const { tabType } = this.state;
    const { appId, subNav } = this.props;
    this.props.onOsTypeChange(tabType, osType);
    this.props.getAppAndAdposList(subNav, appId);
  };

  onStatusChange = status => {
    const { tabType } = this.state;
    const { appId, subNav } = this.props;
    this.props.onStatusChange(tabType, status);
    this.props.getAppAndAdposList(subNav, appId);
  };

  onPageSizeChange = (pageNo, pageSize) => {
    const { tabType } = this.state;
    const { appId, subNav } = this.props;
    this.props.onPageSizeChange(tabType, pageNo, pageSize);
    this.props.getAppAndAdposList(subNav, appId);
  };

  onPageNoChange = pageNo => {
    const { tabType } = this.state;
    const { appId, subNav } = this.props;
    this.props.onPageNoChange(tabType, pageNo);
    this.props.getAppAndAdposList(subNav, appId);
  };

  onOperateStatusChange = operateStatus => {
    const { tabType } = this.state;
    const { appId, subNav } = this.props;
    this.props.onOperateStatusChange(tabType, operateStatus);
    this.props.getAppAndAdposList(subNav, appId);
  };

  onAuditStatusChange = auditStatus => {
    const { tabType } = this.state;
    const { appId, subNav } = this.props;
    this.props.onAuditStatusChange(tabType, auditStatus);
    this.props.getAppAndAdposList(subNav, appId);
  };

  onObjectChange = object => {
    const { tabType } = this.state;
    const { appId, subNav } = this.props;
    this.props.onObjectChange(tabType, object);
    this.props.getAppAndAdposList(subNav, appId);
  };

  onRowSelectionChange = (selectedRowKeys, selectedRows) => {
    console.info(selectedRowKeys, selectedRows, '打印选择列表项是啥子');
  };
  onSwitchChange = () => {};

  render() {
    const {
      tabItems,
      queryCondition,
      selectedRowKeys,
      dataList,
      tabType,
    } = this.state;
    const {
      dateRange: { startDate, endDate },
      keyword,
      pageSize,
      pageNo,
      selectedStatus,
      selectedOsType,
      selectedOperateStatus,
      selectedAuditStatus,
      selectedObject,
    } = queryCondition;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.subNavBar}>
            <AppTabs
              tabItems={tabItems}
              activeTabKey={tabType}
              onTabChange={this.onTabChange}
            />
            <QueryDateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDateRangeChange={this.onDateRangeChange}
            />
          </div>
          <QueryConditionBar
            tabType={tabType}
            keyword={keyword}
            selectedOsType={selectedOsType}
            selectedStatus={selectedStatus}
            selectedOperateStatus={selectedOperateStatus}
            selectedAuditStatus={selectedAuditStatus}
            selectedObject={selectedObject}
            onSearch={this.onSearch}
            onOsTypeChange={this.onOsTypeChange}
            onStatusChange={this.onStatusChange}
            onOperateStatusChange={this.onOperateStatusChange}
            onAuditStatusChange={this.onAuditStatusChange}
            onObjectChange={this.onObjectChange}
          />
          <AppList
            tabType={tabType}
            data={dataList}
            selectedRowKeys={selectedRowKeys}
            onRowSelectionChange={this.onRowSelectionChange}
            pageSize={pageSize}
            pageNo={pageNo}
            onPageSizeChange={this.onPageSizeChange}
            onPageNoChange={this.onPageNoChange}
            onSwitchChange={this.onSwitchChange}
            // onGoToAdList={onGoToAdList}
            // onGoToEditAdEntity={onGoToEditAdEntity}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AppManagement);
