/* eslint-disable no-shadow, react/prop-types */
import React from 'react';
import { Switch } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';
import Link from '../../../components/Link';
import { AppEntitySwitchStatusMapForFE } from '../../../constants/MenuTypes';
import {
  numberFormat,
  getAppLevelFromAppTabType,
  getAppEntityPath,
} from '../../../core/utils';

const formatFloat = numberFormat(2);
const formatInteger = numberFormat(0);

const nonEditableAppEntityNameRender = tabType => record => {
  const level = getAppLevelFromAppTabType(tabType);
  const { name, id } = record[level];
  const toPath = getAppEntityPath(tabType, id); // 需要修改，未处理逻辑
  return <Link to={toPath}>{name}</Link>;
};

const TableColumns = {
  switchBtn: (type, onChange) => ({
    title: '开关',
    key: 'switch',
    fixed: 'left',
    className: s.switchBtn,
    render: record => {
      const level = getAppLevelFromAppTabType(type);
      return (
        <Switch
          size="small"
          disabled={record.switch === AppEntitySwitchStatusMapForFE.已禁用}
          checked={record.switch === AppEntitySwitchStatusMapForFE.已开启}
          onChange={checked => onChange(type, record[level].id, checked)}
        />
      );
    },
  }),
  appName: tabType => ({
    title: '应用名称',
    key: 'appName',
    fixed: 'left',
    className: s.appName,
    render: nonEditableAppEntityNameRender(tabType),
  }),
  osType: {
    title: '平台',
    key: 'osType',
    className: s.osType,
    render: record => {
      const { osType } = record;
      return <span>{osType}</span>;
    },
  },
  adPosName: tabType => ({
    title: '广告位名称',
    key: 'adPosName',
    className: s.adPosName,
    fixed: 'left',
    render: nonEditableAppEntityNameRender(tabType),
  }),
  adPosId: tabType => ({
    title: '广告位ID',
    key: 'adPosId',
    className: s.adPosId,
    render: record => {
      const level = getAppLevelFromAppTabType(tabType);
      const { id } = record[level];
      return <span>{id}</span>;
    },
  }),
  onApp: {
    title: '所在应用',
    key: 'onApp',
    className: s.onApp,
    render: record => {
      const { name } = record.app;
      return <span>{name}</span>;
    },
  },
  adPosType: {
    title: '广告位类型',
    key: 'adPosType',
    className: s.adPosType,
    render: record => <span>{record.adPosType}</span>,
  },
  auditStatus: {
    title: '审核状态',
    key: 'auditStatus',
    className: s.auditStatus,
    render: record => <span>{record.auditStatus}</span>,
  },
  reqAdNum: {
    title: '请求广告数',
    dataIndex: 'reqAdNum',
    key: 'reqAdNum',
    className: s.reqAdNum,
    // render: status =>
    //   Object.keys(AppAdposListMapForFE).find(
    //     key => AppAdposListMapForFE[key] === status,
    //   ) || status,
    render: formatInteger,
    sorter: (a, b) => a.reqAdNum - b.reqAdNum,
  },
  resAdNum: {
    title: '返回广告数',
    dataIndex: 'resAdNum',
    key: 'resAdNum',
    className: s.resAdNum,
    render: formatInteger,
    sorter: (a, b) => a.resAdNum - b.resAdNum,
  },
  fillRate: {
    title: '填充率',
    dataIndex: 'fillRate',
    key: 'fillRate',
    className: s.fillRate,
    render: formatFloat,
  },
  impressionNum: {
    title: '展示数',
    dataIndex: 'impressionNum',
    key: 'impressionNum',
    className: s.impressionNum,
    render: formatInteger,
    sorter: (a, b) => a.impressionNum - b.impressionNum,
  },
  impressionRate: {
    title: '展示率',
    dataIndex: 'impressionRate',
    key: 'impressionRate',
    className: s.impressionRate,
    render: formatFloat,
    sorter: (a, b) => a.impressionRate - b.impressionRate,
  },
  clickNum: {
    title: '点击数',
    dataIndex: 'clickNum',
    key: 'clickNum',
    className: s.clickNum,
    render: formatInteger,
    sorter: (a, b) => a.clickNum - b.clickNum,
  },
  clickRate: {
    title: '点击率',
    dataIndex: 'clickRate',
    key: 'clickRate',
    className: s.clickRate,
    render: val => (typeof val === 'number' ? `${val}%` : '-'),
    sorter: (a, b) => a.clickRate - b.clickRate,
  },
  eCPC: {
    title: '估算千次展示收入',
    dataIndex: 'eCPC',
    key: 'eCPC',
    className: s.eCPC,
    render: formatFloat,
    sorter: (a, b) => a.eCPC - b.eCPC,
  },
  cpc: {
    title: '估算单点击收入',
    dataIndex: 'cpc',
    key: 'cpc',
    className: s.cpc,
    render: formatFloat,
    sorter: (a, b) => a.cpc - b.cpc,
  },
  estimateProfit: {
    title: '估算收入',
    dataIndex: 'estimateProfit',
    key: 'estimateProfit',
    className: s.estimateProfit,
    render: formatFloat,
    sorter: (a, b) => a.cpc - b.cpc,
  },
};

export default withStyles(s)(TableColumns);
