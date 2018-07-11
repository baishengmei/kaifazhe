import { getAdStats } from '../atomicRequest/home';
import { tryCatch, invalidParamsRes } from '../helper';
import { fetchUserInfo } from '../../core/utils';

function mergeDetail(content = {}, [startDateStr, endDateStr]) {
  const {
    totalImpr: impressions = /* istanbul ignore next */ 0,
    totalClick: clickNum = /* istanbul ignore next */ 0,
    totalClickRate: clickRate = /* istanbul ignore next */ 0,
    totalConsumption: consumption = /* istanbul ignore next */ 0,
    totalCostPerClick: cpc = /* istanbul ignore next */ 0,
    totalConv: convertNum = /* istanbul ignore next */ 0,
    totalConvRate: convertRate = /* istanbul ignore next */ 0,
    axisMap: detailMap = {},
  } = content;

  const oneDay = startDateStr === endDateStr;
  const detailList = detailMap[oneDay ? 'hour' : 'xDays'] || [];
  const detail = detailList.map((x, i) => ({
    x,
    consumption: detailMap.consumption ? detailMap.consumption[i] : 0,
    impressions: detailMap.imprNum ? detailMap.imprNum[i] : 0,
    clickNum: detailMap.clickNum ? detailMap.clickNum[i] : 0,
    clickRate: detailMap.clickRate ? detailMap.clickRate[i] : 0,
    cpc: detailMap.costPerClick ? detailMap.costPerClick[i] : 0,
    convertNum: detailMap.convertNum ? detailMap.convertNum[i] : 0,
    convertRate: detailMap.convertRate ? detailMap.convertRate[i] : 0,
  }));

  return {
    summary: {
      impressions,
      clickNum,
      clickRate,
      consumption,
      cpc,
      convertRate,
      convertNum,
    },
    detail,
  };
}

const home = async req => {
  const {
    _accessId: accessId,
    query: { dateRange: dateRangeStr = '', pageSize = 10, pageNo = 1 },
  } = req;

  const user = fetchUserInfo(req);

  const dateRange = dateRangeStr.split(',');
  const valid = dateRange.length === 2 && dateRange[0] <= dateRange[1];

  if (!valid) {
    return invalidParamsRes;
  }

  const timeout = 5000;
  const data = { dateRange, pageSize, pageNo };
  const ret = await getAdStats(accessId, user, timeout, data);
  const resData = mergeDetail(ret, data.dateRange);
  return {
    content: {
      resData,
    },
  };
};

export default tryCatch(home);
