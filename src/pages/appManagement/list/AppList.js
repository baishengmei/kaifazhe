import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import s from './index.css';
import {
  AppTabTypes,
  PageSizeOptions,
  OperationStatus,
  AppAdposListMapForFE as StatusForFE,
  AppEntitySwitchStatusMapForFE,
} from '../../../constants/MenuTypes';
import TableColumns from './TableColumns';
import { getAppLevelFromAppTabType } from '../../../core/utils';

const { appTab, adPosTab, appAdPosTab } = AppTabTypes;

const getColumns = (type, onSwitchChange) => {
  switch (type) {
    case appTab:
      return [
        TableColumns.switchBtn(type, onSwitchChange),
        TableColumns.appName(type),
        TableColumns.app.osType,
        TableColumns.reqAdNum,
        TableColumns.resAdNum,
        TableColumns.fillRate,
        TableColumns.impressionNum,
        TableColumns.impressionRate,
        TableColumns.clickNum,
        TableColumns.clickRate,
        TableColumns.eCPC,
        TableColumns.cpc,
        TableColumns.estimateProfit,
      ];
    case adPosTab:
    case appAdPosTab:
      return [
        TableColumns.switchBtn(type, onSwitchChange),
        TableColumns.adPosName(type),
        TableColumns.adPos.onApp,
        TableColumns.adPosId(type),
        TableColumns.adPos.adPosType,
        TableColumns.adPos.auditStatus,
        TableColumns.reqAdNum,
        TableColumns.resAdNum,
        TableColumns.fillRate,
        TableColumns.impressionNum,
        TableColumns.impressionRate,
        TableColumns.clickNum,
        TableColumns.clickRate,
        TableColumns.eCPC,
        TableColumns.cpc,
        TableColumns.estimateProfit,
      ];
    default:
      return [];
  }
};

const getTableRowClassName = record =>
  record.status === StatusForFE.暂停 ? s.deleted : '';

const appListShape = PropTypes.shape({
  status: PropTypes.oneOf(Object.keys(OperationStatus)).isRequired,
  total: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
});

const getTableRowCheckboxProps = record => ({
  disabled: record.switch === AppEntitySwitchStatusMapForFE.已禁用,
});

const getTableData = (data, tabType) =>
  data.map(d => {
    const level = getAppLevelFromAppTabType(tabType);
    return {
      ...d,
      key: d[level].id,
    };
  });

class AppList extends Component {
  static propTypes = {
    tabType: PropTypes.oneOf(Object.keys(AppTabTypes)).isRequired,
    // loading: PropTypes.bool.isRequired,
    data: appListShape.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageNo: PropTypes.number.isRequired,
    selectedRowKeys: PropTypes.arrayOf(PropTypes.number).isRequired,
    onRowSelectionChange: PropTypes.func.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
    onPageNoChange: PropTypes.func.isRequired,
    onSwitchChange: PropTypes.func,
  };
  static defaultProps = {
    onSwitchChange: null,
  };

  constructor(props) {
    super(props);
    const {
      // loading,
      tabType,
      data,
      // selectedRowKeys,
      pageSize,
      pageNo,
      onSwitchChange,
      selectedRowKeys,
    } = props;
    this.state = {
      // loading,
      // selectedRowKeys,
      columns: getColumns(tabType, onSwitchChange),
      xScroll: 1120,
      list: data.list.length === 0 ? [] : getTableData(data.list, tabType),
      total: data.total,
      pageSize,
      pageNo,
      selectedRowKeys,
    };
  }

  componentWillReceiveProps({
    // loading,
    tabType,
    data,
    pageSize,
    pageNo,
    onSwitchChange,
    selectedRowKeys,
  }) {
    const newState = {
      // loading,
      total: data.total,
      pageSize,
      pageNo,
      selectedRowKeys,
    };
    if (tabType !== this.props.tabType) {
      newState.columns = getColumns(tabType, onSwitchChange);
    }
    if (data !== this.props.data) {
      newState.list =
        data.list.length === 0 ? [] : getTableData(data.list, tabType);
    }
    this.setState(newState);
  }

  render() {
    const {
      onRowSelectionChange,
      onPageSizeChange,
      onPageNoChange,
    } = this.props;
    const {
      loading,
      selectedRowKeys,
      columns,
      xScroll,
      list,
      total,
      pageSize,
      pageNo,
    } = this.state;

    return (
      <section className={s.list}>
        <LocaleProvider locale={zhCN}>
          <Table
            rowSelection={{
              selectedRowKeys,
              getCheckboxProps: getTableRowCheckboxProps,
              onChange: onRowSelectionChange,
            }}
            rowClassName={getTableRowClassName}
            columns={columns}
            dataSource={list}
            bordered
            loading={loading}
            scroll={{ x: xScroll }}
            pagination={{
              size: 'small',
              current: pageNo,
              pageSize,
              showSizeChanger: true,
              pageSizeOptions: PageSizeOptions,
              total,
              onChange: onPageNoChange,
              onShowSizeChange: onPageSizeChange,
            }}
          />
        </LocaleProvider>,
      </section>
    );
  }
}

export { AppList as default, appListShape };
