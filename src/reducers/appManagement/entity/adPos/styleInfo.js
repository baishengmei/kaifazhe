import {
  flowStyleItems,
  AdPosAuditStatus,
  objectTypeItems,
  pictureElemsMapKey,
  textElemsMapKey,
  videoElemsMapKey,
  styleElemName,
} from '../../../../constants/MenuTypes';
import { CREATE_APP, ADPOS_ADD_ELEM } from '../../../../constants';
// import { ADPOS_ITEM_CHANGE, RESET_ADPOS_ITEM } from '../../../../constants';

const initialState = [
  {
    flowInfoStyleType: flowStyleItems[0].name, // 信息流对应的样式类型，默认为小图
    styleType: '', // 样式类型，根据广告位类型不同而不同，比如开屏样式、小图样式等
    auditStatus: AdPosAuditStatus[1].name, // 审核状态
    styleName: '', // 样式名称
    objectType: objectTypeItems[0].value, // 推广表的类型
    appVersion: '0', // 可兼容的最低/高版本号或App当前版本号
    pictureElems: Object.keys(pictureElemsMapKey).concat('自定义'), // 默认添加元素图片菜单
    pictures: [
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
    textElems: Object.keys(textElemsMapKey).concat('自定义'),
    texts: [
      {
        elemName: '',
        elemKey: '',
        attr: 0, // 字数
      },
    ],
    videoElems: Object.keys(videoElemsMapKey),
    videos: [
      {
        elemName: '视频链接',
        elemKey: 'videourl',
        attr: 1000,
      },
    ],
  },
  {
    flowInfoStyleType: flowStyleItems[0].name, // 信息流对应的样式类型，默认为小图
    styleType: '', // 样式类型，根据广告位类型不同而不同，比如开屏样式、小图样式等
    auditStatus: AdPosAuditStatus[1].name, // 审核状态
    styleName: '', // 样式名称
    objectType: objectTypeItems[0].value, // 推广表的类型
    appVersion: '0', // 可兼容的最低/高版本号或App当前版本号
    pictureElems: Object.keys(pictureElemsMapKey).concat('自定义'), // 默认添加元素图片菜单
    pictures: [
      {
        elemName: '主图片', // 元素名
        elemKey: '', // 元素key
        ratio: '', // 比例
        attr: {
          width: 0, // 尺寸的宽
          height: 0, // 尺寸的高
        },
        isStandard: true, // 标准元素 true；非标准元素 false
      },
    ],
    textElems: Object.keys(textElemsMapKey).concat('自定义'),
    texts: [
      {
        elemName: '',
        elemKey: '',
        attr: 0, // 字数
        isStandard: true, // 标准元素 true；非标准元素 false
      },
    ],
    videoElems: Object.keys(videoElemsMapKey),
    videos: [
      {
        elemName: '视频链接',
        elemKey: 'videourl',
        attr: 1000,
      },
    ],
  },
];

const styleInfo = (state = initialState, { type, payload, error }) => {
  if (type === ADPOS_ADD_ELEM) {
    const { elemType, elemValue, index } = payload;
    const elemTypeIndex = styleElemName.findIndex(t => t === elemType);
    const elemTypeInState =
      elemTypeIndex === 0
        ? 'pictures'
        : elemTypeIndex === 1 ? 'texts' : 'videos';
    const newState = state.map((t, i) => {
      if (i === index) {
        return {
          ...t,
          [elemTypeInState]: [...elemValue],
        };
      }
      return t;
    });
    return newState;
  }
  // console.info(error, '这里之后会用到的，error');
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
