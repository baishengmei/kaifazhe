/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s2 from './index.css';
import s from '../index.css';
import {
  OperationStatus,
  saveButtonText,
} from '../../../../constants/MenuTypes';
import {
  classnames,
  updateComponentStateByKeys,
  componentUpdateByState,
} from '../../../../core/utils';
import iconDown from '../../../../../public/images/ic_arrowdown_blue_down.png';
import FormFooterActionBar from '../FormFooterActionBar';

const columns = [
  {
    title: '设备号',
    dataIndex: 'deviceId',
    className: s2.deviceId,
    render: text => <span>{text}</span>,
  },
  {
    title: '备注',
    dataIndex: 'comment',
    className: s2.comment,
    render: text => <span>{text}</span>,
  },
];

class SelfTest extends Component {
  static propTypes = {
    selfTestDevice: PropTypes.shape({
      adPosId: PropTypes.string.isRequired,
      deviceList: PropTypes.arrayOf(PropTypes.object.isRequired),
    }).isRequired,
    onSaveData: PropTypes.func.isRequired,
    onGoToAppList: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { selfTestDevice: { adPosId, deviceList } } = this.props;
    this.state = {
      adPosId,
      deviceList,
      showAllDevice: false,
    };
    this.componentWillReceiveProps = updateComponentStateByKeys([
      'adPosId',
      'deviceList',
    ]);
    this.shouldComponentUpdate = componentUpdateByState;
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     status: nextProps.status,
  //     adPosInfo: nextProps.adPosInfo,
  //     styleInfo: nextProps.styleInfo,
  //   });
  // }

  onSave = btnText => {
    console.info(btnText, '打印按钮点击类型333');
    // true 保存；false: 保存并继续
    const saveType = btnText === saveButtonText[0];
    this.props.onSaveData(saveType);
  };

  onCancel = () => {
    // 点击取消后，点击确定按钮，跳转到对应的页面
    this.props.onGoToAppList('adPos');
  };

  showAllDevice = () => {
    this.setState({
      showAllDevice: true,
    });
  };

  render() {
    // const isLoading = status === OperationStatus.loading;
    const { adPosId, deviceList, showAllDevice } = this.state;
    const deviceListHeight = showAllDevice ? 'inherit' : '307px';
    const cancelHintText = `您当前正在新建应用，确定要取消新建吗？`;
    const formValid = true;
    const list = deviceList.map((t, i) => {
      t.key = i;
      return t;
    });
    return (
      <div className={s.main}>
        <div
          className={classnames({
            [s.setting]: true,
            [s2.integration]: true,
          })}
        >
          <div className={s.setting__title}>
            集成
            <div className={s2['integration_content']}>
              恭喜你已经成功创建广告位及样式，请根据如下步骤接入和自测；
              <br />
              1 &nbsp; 请使用该广告位ID进行接入：{adPosId}
              <br />
              2 &nbsp;
              接入完成之后，进入集成与自测阶段，SDK与API接入需要添加自测设备的设备号，JSSDK对接则无需再添加自测设备号
              <br />
              3 &nbsp;
              添加并保存（或保存并继续）之后，等待15分钟左右，即可请求到自测广告，如有疑问，请参考<a href="http://www.baidu.com">
                帮助中心
              </a>查看详情指导
            </div>
          </div>
        </div>
        <div
          className={classnames({
            [s.setting]: true,
            [s2.deviceTable]: true,
          })}
        >
          <div className={s.setting__title}>
            确认自测设备
            <div className={s2.selfDevice}>
              请确认自测设备的设备号已经在下表中，如需进行添加/删除/修改等操作，请前往<a href="http://www.baidu.com">
                账户管理-自测设备管理
              </a>
            </div>
            <div
              style={{
                height: `${deviceListHeight}`,
                overflow: 'hidden',
                marginBottom: '42px',
              }}
            >
              <Table columns={columns} dataSource={list} bordered />
            </div>
            {!showAllDevice && (
              <div
                className={s2.openBtn}
                onClick={this.showAllDevice}
                role="none"
              >
                <div>展开</div>
                <img src={iconDown} alt="" className={s2.openIcon} />
              </div>
            )}
            <div className={s2.selfDeviceConfirm}>
              请确认自测设备并保存（或保存并继续）之后，等待15分钟左右，即可请求到自测广告，如有疑问，请参考<a href="http://www.baidu.com">
                帮助中心
              </a>查看详情指导
            </div>
          </div>
        </div>
        <FormFooterActionBar
          // status={status}
          status="load_success"
          cancelHintText={cancelHintText}
          saveButtonText={saveButtonText}
          saveButtonValid={status !== OperationStatus.load_fail && formValid}
          onSave={this.onSave}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}

export default withStyles(s, s2)(SelfTest);
