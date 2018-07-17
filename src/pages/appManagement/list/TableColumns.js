/* eslint-disable no-shadow, react/prop-types */
import React from 'react';
import { Switch } from 'antd';
import s from './index.css';
import Link from '../../../components/Link';
import {
  AppTabTypes,
  AppEntitySwitchStatusMapForFE,
} from '../../../constants/MenuTypes';
import { numberFormat } from '../../../core/utils';

const formatFloat = numberFormat(2);
const formatInteger = numberFormat(0);

const nonEditableAppEntityNameRender = tabType => record => {
  const { appId, appName } = record.app;
  const data = {
    appId,
    appName,
  };
  const toPath = AppTabTypes[tabType];
  return <Link to={toPath}>{data.appName}</Link>;
};

const TableColumns = {
  switchBtn: (type, onChange) => ({
    title: '开关',
    key: 'switch',
    className: s.switchBtn,
    render: record => {
      const level = AppTabTypes[type];
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
    className: s.appName,
    render: nonEditableAppEntityNameRender(tabType),
  }),
  app: {
    osType: () => ({
      title: '平台',
      key: 'osType',
      className: s.osType,
      render: record => {
        const { osType } = record;
        return { osType };
      },
    }),
  },
  adPosName: tabType => ({
    title: '广告位',
    key: 'adPosName',
    className: s.adPosName,
    render: nonEditableAppEntityNameRender(tabType),
  }),
  adPosId: () => ({
    title: '广告位ID',
    key: 'adPosId',
    className: s.adPosId,
    render: record => record.adPosId,
  }),
  adPos: {
    onApp: () => ({
      title: '所在应用',
      key: 'onApp',
      className: s.onApp,
      render: record => {
        const { name } = record.onApp;
        return { name };
      },
    }),
    adPosType: () => ({
      title: '广告位形式',
      key: 'adPosType',
      render: record => record.adPosType,
    }),
    auditStatus: () => ({
      title: '审核状态',
      key: 'auditStatus',
      render: record => record.auditStatus,
    }),
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
    title: '预估千次点击收益',
    dataIndex: 'eCPC',
    key: 'eCPC',
    className: s.eCPC,
    render: formatFloat,
    sorter: (a, b) => a.eCPC - b.eCPC,
  },
  cpc: {
    title: '预估单次点击收益',
    dataIndex: 'cpc',
    key: 'cpc',
    className: s.cpc,
    render: formatFloat,
    sorter: (a, b) => a.cpc - b.cpc,
  },
  estimateProfit: {
    title: '预估收益',
    dataIndex: 'estimateProfit',
    key: 'estimateProfit',
    className: s.estimateProfit,
    render: formatFloat,
    sorter: (a, b) => a.cpc - b.cpc,
  },
};

export default TableColumns;
