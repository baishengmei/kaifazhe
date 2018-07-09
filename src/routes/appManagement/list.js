import React from 'react';
import AppManagement from './AppManagement';

const AdHierarchy = {
  sponsor: 'sponsor',
  adCampaign: 'adCampaign',
  adGroup: 'adGroup',
  adContent: 'adContent',
};
const { adCampaign, adGroup, adContent } = AdHierarchy;
const titles = {
  [adCampaign]: '推广系列',
  [adGroup]: '推广组',
  [adContent]: '创意',
};

const component = <AppManagement />;

export default [
  {
    path: '/',
    action: () => ({
      status: 302,
      redirect: `/adManagement/${adCampaign}`,
    }),
  },
  {
    path: new RegExp(`^/(${adCampaign})$`),
    async action(context) {
      console.info(context, '打印context列表26');
      return {
        title: titles[0],
        component,
      };
    },
  },
  {
    path: new RegExp(`^/(${adGroup})$`),
    async action(context) {
      console.info(context, '列表数据的确认');
      return {
        title: titles[1],
        component,
      };
    },
  },
  {
    path: new RegExp(`^/(${adContent})$`),
    async action(context) {
      console.info(context, '列表数据2');
      return {
        title: titles[2],
        component,
      };
    },
  },
];
