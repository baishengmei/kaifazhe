import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, LocaleProvider, Switch } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import cx from 'classnames';
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
        TableColumns.osType,
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
        TableColumns.onApp,
        TableColumns.adPosId(type),
        TableColumns.adPosType,
        TableColumns.auditStatus,
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
    onStyleSwitchChange: PropTypes.func.isRequired,
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

  expandedRowRender = record => {
    return (
      <div className={s.styleContent}>
        <div className={s.styleRow}>
          <div style={{ display: 'inline-block', width: '126px' }} />
          <div className={cx(s.styleH, s.styleNameH)}>样式名称</div>
          <div className={cx(s.styleH, s.styleIdH)}>样式ID</div>
          <div className={cx(s.styleH, s.styleAuditStatusH)}>审核状态</div>
        </div>
        {record.style.map(st => {
          return (
            <div key={st.id} className={s.styleRow}>
              <div className={s.styles}>
                <div className={s.styleBlock} />
                <div className={s.styleSwitch}>
                  <Switch
                    size="small"
                    disabled={
                      st.switch === AppEntitySwitchStatusMapForFE.已禁用
                    }
                    checked={st.switch === AppEntitySwitchStatusMapForFE.已开启}
                    onChange={checked => {
                      this.props.onStyleSwitchChange(
                        record.adPos.udid,
                        st.id,
                        checked,
                      );
                    }}
                    key={st.id}
                  />
                </div>
                <div className={s.styleName}>{st.name}</div>
                <div className={s.styleId}>{st.id}</div>
                <div className={s.styleAuditStatus}>{st.auditStatus}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const {
      onRowSelectionChange,
      onPageSizeChange,
      onPageNoChange,
      tabType,
    } = this.props;
    const {
      loading,
      selectedRowKeys,
      columns,
      list,
      total,
      pageSize,
      pageNo,
    } = this.state;
    const xScroll = tabType === 'appTab' ? 1400 : 1810;

    return (
      <section className={s.list}>
        <LocaleProvider locale={zhCN}>
          {tabType === AppTabTypes.appTab ? (
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
          ) : (
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
              expandedRowRender={this.expandedRowRender}
            />
          )}
        </LocaleProvider>,
      </section>
    );
  }
}

export { AppList as default, appListShape };
