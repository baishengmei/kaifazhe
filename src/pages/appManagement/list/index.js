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
import AdTabs from './AdTabs';
import QueryDateRangePicker from './QueryDateRangePicker';
import { AppTabItems } from '../../../constants/MenuTypes';
import QueryConditionBar from './QueryConditionBar';

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
    onGoToAppAdposList: PropTypes.func.isRequired,
    queryCondition: singleQueryConditionShape.isRequired,
  };

  constructor(props) {
    super(props);
    const { tabType, queryCondition } = props;
    this.state = { tabItems: AppTabItems[tabType], queryCondition };
  }

  onTabChange = tabItem => {
    console.info(tabItem, this.state.tabItems, '点击了导航功能哈');
    this.props.onGoToAppAdposList(tabItem);
  };

  onDateRangeChange = ranges => {
    console.info(ranges, '打印ranges');
    // this.props.onDateRangeChange(tabType, ranges);
    // this.onFetchList(tabType);
  };

  render() {
    const { tabType } = this.props;
    const { tabItems, queryCondition } = this.state;
    const {
      dateRange: { startDate, endDate },
      keyword,
      // pageSize,
      // pageNo,
      // selectedStatus,
      // selectedOsType,
      // selectedOperateStatus,
      // selectedAuditStatus,
      // selectedObject,
    } = queryCondition;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.subNavBar}>
            <AdTabs
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
            onSearch={this.onSearch}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AppManagement);
