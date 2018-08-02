// import { NewAdPosSettingItems } from '../../../../constants/MenuTypes';
// import { ADPOS_ITEM_CHANGE, RESET_ADPOS_ITEM } from '../../../../constants';

const initialState = {
  styleType: '', // 样式类型，根据广告位类型不同而不同，比如开屏样式、小图样式等
  auditStatus: '', // 审核状态
  styleName: '', // 样式名称
  objectType: '', // 推广表的类型
  appVersion: '', // 可兼容的最低/高版本号或App当前版本号
  pictures: {
    pictureElems: [
      '主图片',
      '主图片1',
      '主图片2',
      '主图片3',
      '主图片4',
      '图标',
      '封面配图',
      '自定义',
    ], // 默认添加元素图片菜单
    picture: [
      {
        elemName: '', // 元素名
        elemKey: '', // 元素key
        ratio: '', // 比例
        attr: {
          width: 0, // 尺寸的宽
          height: 0, // 尺寸的高
        },
      },
    ],
  },
  texts: {
    textElems: [
      '标题',
      '描述',
      '行动号召文案（如：立即下载、免费体验等）',
      '企业/品牌/应用名（如网易有道、有道词典等）',
      '自定义',
    ],
    text: [
      {
        elemName: '',
        elemKey: '',
        attr: 0, // 字数
      },
    ],
  },
};

const styleInfo = (state = initialState, { type, payload, error }) => {
  console.info(error, '这里之后会用到的，error');
  // if (type === CREATE_APP_FAIL) {
  //   if (error instanceof Error && 'code' in error && error.code === 409) {
  //     return {
  //       ...state,
  //       nameConflict: true,
  //     };
  //   }
  //   return {
  //     ...state,
  //     nameConflict: false,
  //   };
  // }
  return state;
};

export default styleInfo;
