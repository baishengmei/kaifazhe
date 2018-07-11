import { javaHost } from '../../config';

const javaServer = `http://${javaHost}`;
const apiVersion = 'v1.0.0';
const apiServer = `${javaServer}/${apiVersion}`;

export default {
  /**
   * 获取广告的整体数据
   * @method GET
   * @param {String} timePeroidType 单选range,simpleTimePeriod, range需要填开始或结束时间
   * @param {String} simpleTimePeriod 单选today,yesterday,last7days, last14days,last30days等
   * @param {String} beginDateField 开始日期，yyyy-MM-dd
   * @param {String} endDateField 结束日期，yyyy-MM-dd
   * @param {String} pageSize 每页容量，当查询天数过多时最好指定，否则默认会全部查出
   * @param {String} pageNo 第几页，默认为1
   *
   */
  adStats: `${apiServer}/sponsors/{sponsorId}/stats`,
};
