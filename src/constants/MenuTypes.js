// ======================================= 其他 -- START ==========================================//

/**
 * 所有操作的状态值
 */
const OperationStatus = {
  initial: 'initial',
  loading: 'loading',
  load_success: 'load_success',
  load_fail: 'load_fail',
  editing: 'editing',
  saving: 'saving',
  save_success: 'save_success',
  save_fail: 'save_fail',
};
// ======================================= 其他 -- END ==========================================//

// ====================================== 应用管理 --START =========================================//
/**
 * 列表页各tab的层级关系类型
 */
const AppTabTypes = {
  appTab: 'appTab',
  adPosTab: 'adPosTab',
  appAdPosTab: 'appAdPosTab',
};

/**
 * 列表页不同层级的 tabs
 */
const AppTabItems = {
  [AppTabTypes.appTab]: [
    {
      key: AppTabTypes.appTab,
      name: '应用',
    },
    {
      key: AppTabTypes.adPosTab,
      name: '广告位',
    },
  ],
  [AppTabTypes.adPosTab]: [
    {
      key: AppTabTypes.appTab,
      name: '应用',
    },
    {
      key: AppTabTypes.adPosTab,
      name: '广告位',
    },
  ],
  [AppTabTypes.appAdPosTab]: [
    {
      key: AppTabTypes.appAdPosTab,
      name: '广告位',
    },
  ],
};

/**
 * 应用和广告位列表页 查询条件前端对应关系
 */
const AppAdposListMapForFE = {
  不限: 'all',
  暂停: 'pause',
  开启: 'open',
  删除: 'delete',
  iOS: 'ios',
  Android: 'android',
  安卓: 'android',
  有效: 'effect',
  审核中: 'onaudit',
  审核不通过: 'unpass',
  草稿: 'draft',
  信息流: 'infoFlow',
  开屏: 'openScreen',
  插屏: 'insertScreen',
  焦点图: 'focusImg',
  激励视频: 'enVideo',
  横幅: 'banner',
  自定义: 'custom',
};

/**
 * 应用管理 状态(or操作状态)的前端对照关系
 */
const AppEntitySwitchStatusMapForFE = {
  已开启: 'open',
  已暂停: 'pause',
  已禁用: 'delete',
};

/**
 * 查询条件应用和广告位列表 状态或操作状态 菜单
 */
const AppAdposStatus = ['不限', '暂停', '开启'].map(t => ({
  name: t,
  value: AppAdposListMapForFE[t],
}));

/**
 * 查询条件应用和广告位列表页 批量操作 菜单
 */
const TrackMultipleOperationItems = ['开启', '暂停', '删除'].map(t => ({
  name: t,
  value: AppAdposListMapForFE[t],
}));

/**
 * 查询条件中应用列表页 平台 菜单
 */
const AppOsTypes = ['不限', 'iOS', 'Android'].map(t => ({
  name: t,
  value: AppAdposListMapForFE[t],
}));

/**
 * 查询条件广告位列表页 审核状态 菜单
 */
const AdPosAuditStatus = ['不限', '草稿', '审核中', '有效', '审核不通过'].map(
  t => ({
    name: t,
    value: AppAdposListMapForFE[t],
  }),
);

/**
 * 查询条件广告位列表页 广告位类型 菜单
 */
const AdPosObject = [
  '不限',
  '信息流',
  '开屏',
  '插屏',
  '焦点图',
  '激励视频',
  '横幅',
  '自定义',
].map(t => ({
  name: t,
  value: AppAdposListMapForFE[t],
}));

/**
 * 每页显示条数
 */
const PageSizeOptions = ['10', '20', '50', '100'];

/**
 * 应用管理新建页面中子设置项
 */
const NewAppSettingItems = [
  {
    name: '新建应用',
    value: 'newApp',
  },
];
const NewAdPosSettingItems = [
  {
    name: '广告位信息',
    value: 'adPosSetting',
  },
  {
    name: '样式信息',
    value: 'styleSetting',
  },
];
const NewSelfTestSettingItems = [
  {
    name: '集成',
    value: 'integration',
  },
  {
    name: '确认自测设备',
    value: 'selfTestDevice',
  },
  {
    name: '获取自测物料',
    value: 'selfTestMaterial',
  },
];
const NewToAuditSettingItems = [
  {
    name: '上传截图',
    value: 'uploadScreenShot',
  },
  {
    name: '上传安装包',
    value: 'uploadInstallPackage',
  },
];

/**
 * 新建应用 平台
 */
const AppOsTypeZH = ['安卓', 'iOS'].map(t => ({
  name: t,
  value: AppAdposListMapForFE[t],
}));

/**
 * 新建页面 保存与保存并继续按钮
 */
const saveButtonText = ['保存', '保存并继续'];

/**
 * 新建页面，各项与前端对应关系
 */
const AppAdposNewMapForFE = {
  不限: 'all',
  大图: 'bigImage',
  小图: 'smallImage',
  组图: 'exImage',
  视频: 'video',
  落地页型: 'landingPage',
  应用下载型: 'appDownload',
};

/**
 * 信息流样式
 */
const flowStyleItems = ['小图', '大图', '组图', '视频'].map(t => ({
  name: t,
  value: AppAdposNewMapForFE[t],
}));

/**
 * 新建样式推广标的类型
 */
const objectTypeItems = ['不限', '落地页型', '应用下载型'].map(t => ({
  name: t,
  value: AppAdposNewMapForFE[t],
}));

/**
 * 样式信息：文字、图片、视频样式
 */
const pictureElemsMapKey = {
  主图片: 'mainimage',
  主图片1: 'mainimage1',
  主图片2: 'mainimage2',
  主图片3: 'mainimage3',
  主图片4: 'mainimage4',
  图标: 'iconimage',
  封面配图: 'coverimage',
};
const textElemsMapKey = {
  标题: 'title',
  描述: 'text',
  '行动号召文案（如：立即下载、免费体验等）': 'ctatext',
  '企业/品牌/应用名（如网易有道、有道词典等）': 'appName',
};
const videoElemsMapKey = {
  视频链接: 'videourl',
};

/**
 * 样式信息表格元素类型
 */
const styleElemName = ['图片元素', '文字元素', '视频元素'];

/**
 * 图片元素比例对应尺寸，除iconimage外
 */
const pictureElemRatio = {
  '1:2': '480*960',
  '9:16': '720*1280',
  '2:3': '640*960',
  '1:1': '640*640',
  '4:3': '640*480',
  '3:2': '720*480',
  '5:3': '800*480',
  '16:9': '1280*720',
  '2:1': '960*480',
  '11:4': '1320*480',
  '3:1': '1440*480',
  '32:5': '640*100',
};

// ====================================== 应用管理 --END ==========================================//

export {
  AppAdposListMapForFE,
  OperationStatus,
  AppTabTypes,
  AppTabItems,
  AppAdposStatus,
  AppOsTypes,
  TrackMultipleOperationItems,
  AdPosAuditStatus,
  AdPosObject,
  PageSizeOptions,
  AppEntitySwitchStatusMapForFE,
  NewAppSettingItems,
  NewAdPosSettingItems,
  NewSelfTestSettingItems,
  NewToAuditSettingItems,
  AppOsTypeZH,
  saveButtonText,
  flowStyleItems,
  objectTypeItems,
  pictureElemsMapKey,
  textElemsMapKey,
  videoElemsMapKey,
  styleElemName,
  pictureElemRatio,
};
