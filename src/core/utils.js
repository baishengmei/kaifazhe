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
export const getAppEntityPath = (tabType, name) => {
  switch (tabType) {
    case 'appTab':
      return `/appManagement/${name}/adSlot`;
    case 'adPosTab':
    case 'appAdPosTab':
      return `/appManagement/${name}/adSlot/edit`;
    default:
      return;
  }
};

/**
 * 应用管理列表页 新建应用/新建广告位
 */
export const createNewEntityPath = (tabType, id) => {
  switch (tabType) {
    case 'appTab':
      return '/appManagement/app/new';
    default:
      return `/appManagement/${id}/adSlot/new`;
  }
};

/**
 * 传入多class
 * @param {传入的class} args
 */
export function classnames(...args) {
  const ret = [];
  args.forEach(item => {
    switch (typeof item) {
      case 'string':
        ret.push(item);
        break;
      case 'object': {
        Object.keys(item).forEach(key => {
          if (item[key]) {
            ret.push(key);
          }
        });
        break;
      }
      default:
        if (item) {
          ret.push(String(item));
        }
    }
  });
  return ret.join(' ');
}

export function checkTextLength(str, minLength, maxLength) {
  return (
    typeof str === 'string' &&
    str.length >= minLength &&
    str.length <= maxLength
  );
}

/**
 * 应用、广告位名称长度范围
 */
export const appAdPosEntityNameLengthRange = [1, 15];

export function isValidAppAdPosEntityName(name) {
  return checkTextLength(
    name.trim(),
    appAdPosEntityNameLengthRange[0],
    appAdPosEntityNameLengthRange[1],
  );
}

// 求最大公约数
export function gcd(a, b) {
  let r;
  while (b > 0) {
    r = a % b;
    a = b; // eslint-disable-line no-param-reassign
    b = r; // eslint-disable-line no-param-reassign
  }
  return a;
}

// 是否是正整数
export function isPositiveInteger(n) {
  const num = typeof n === 'number' ? n : Number(n);
  return Number.isInteger(num) && num > 0;
}

// 获取应用管理多维度新建项 -- 应用和广告位列表的path
export const getAppEntityListPath = (tabType, appName) => {
  switch (tabType) {
    case 'adPos':
      return `/appManagement/${appName}/adSlot`;
    case 'app':
      return '/appManagement/app';
  }
};
