// similar function as array.filter
export function filterObject(o, filter) {
  const r = {};
  Object.keys(o).forEach(k => {
    if (filter(o[k], k)) {
      r[k] = o[k];
    }
  });
  return r;
}

// 从req中获取用户信息
export function fetchUserInfo(req) {
  return {
    sponsorId: req.cookies.UID,
    email: req.cookies.XZXEMAIL,
    token: req.cookies.XZHTK,
    isDirectUser: req.cookies.ISDIRECTUSER,
    isCompany: req.cookies.ISCOMPANY,
  };
}

// 根据指定 key 来更新 component 的 state
export function updateComponentStateByKeys(keys) {
  return function updateComponentStateByProps(nextProps) {
    const nextState = {};
    keys.forEach(key => {
      if (key in nextProps) {
        nextState[key] = nextProps[key];
      }
    });
    this.setState(nextState);
  };
}

// 使用 === 判断 state 和 nextState 是否相等，来决定组件是否应该更新
export function componentUpdateByState(nextProps, nextState) {
  const s = this.state;
  return Object.keys(s).some(key => s[key] !== nextState[key]);
}

/**
 * 格式化数字为财务格式，保留2位小数
 *
 * @example
 * numberFormat(2)(23283.892) => 23,283.89
 */
export function numberFormat(fractionDigits) {
  if (fractionDigits < 0 || fractionDigits > 20) {
    throw new RangeError(
      'digits argument fractionDigits must be between 0 and 20',
    );
  }
  const that = typeof window === 'undefined' ? global : window;
  const sysFormater =
    that.Intl &&
    that.Intl.NumberFormat &&
    new that.Intl.NumberFormat('zh-Hans-CN', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  return sysFormater
    ? sysFormater.format
    : function format(n) {
        if (
          typeof n !== 'number' ||
          (typeof n === 'string' && isNaN(parseFloat(n)))
        ) {
          return 'NaN';
        }
        const numberArr = Number(n)
          .toFixed(fractionDigits)
          .split('');
        const indexBeforeDot =
          numberArr.length -
          1 -
          (fractionDigits === 0 ? 0 : fractionDigits + 1);
        for (let i = indexBeforeDot, cnt = 0; i >= 0; i -= 1) {
          if (
            ++cnt % 3 === 0 && // eslint-disable-line no-plusplus
            i - 1 >= 0 &&
            numberArr[i - 1] !== '-' // 当前位的前一位不是负号
          ) {
            numberArr.splice(i, 0, ',');
          }
        }
        return numberArr.join('');
      };
}

/**
 * app hierarchy ( app level ) 与  app tabtype 的转化
 */
export const getAppLevelFromAppTabType = type => {
  switch (type) {
    case 'appTab':
      return 'app';
    case 'adPosTab':
    case 'appAdPosTab':
      return 'adPos';
    default:
      throw new Error(`无效的 AdTabTypes:${type}`);
  }
};

/**
 * 应用管理列表页 导航路由
 */
export const getAppAdPosPath = tabType => {
  switch (tabType.key) {
    case 'appTab':
      return '/appManagement/app';
    case 'adPosTab':
      return '/appManagement/adSlot';
    default:
      return;
  }
};

/**
 * 应用管理列表页 表格项点击路由跳转
 * tabType: 被点击项所在导航tab；
 * id：被点击项的id
 */
export const getAppEntityPath = (tabType, id) => {
  switch (tabType) {
    case 'appTab':
      return `/appManagement/${id}/adSlot`;
    case 'adPosTab':
    case 'appAdPosTab':
      return `/appManagement/${id}/adSlot/edit`;
    default:
      return;
  }
};
