import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';
import NewAdSteps from './Steps';
import { AppTabTypes, OperationStatus } from '../../../constants/MenuTypes';
// import { componentUpdateByState } from '../../../core/utils';
import App from './app';
import AdSlot from './adSlot';

// 获取新建页面，左侧导航包含的级数，通过editing、initial判断，以及数组的length
const getStepInfo = (
  tabType,
  appData,
  adPosData,
  selfTestData,
  toAuditData,
) => {
  switch (tabType) {
    case AppTabTypes.appTab:
      return [
        appData.status,
        adPosData.status,
        selfTestData.status,
        toAuditData.status,
      ];
    case AppTabTypes.appAdPosTab:
      return [adPosData.status, selfTestData.status, toAuditData.status];
    default:
      throw new Error(`无效参数: ${tabType}`);
  }
};

class New extends Component {
  static propTypes = {
    tabType: PropTypes.oneOf(Object.keys(AppTabTypes)).isRequired,
    appData: PropTypes.shape({}).isRequired,
    adPosData: PropTypes.shape({}).isRequired,
    selfTestData: PropTypes.shape({}).isRequired,
    toAuditData: PropTypes.shape({}).isRequired,
    onEditApp: PropTypes.func.isRequired,
    onEditAdPos: PropTypes.func.isRequired,
    onEditSelfTest: PropTypes.func.isRequired,
    onEditToAudit: PropTypes.func.isRequired,
    onAppDataChange: PropTypes.func.isRequired,
    onSaveAppData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { tabType, appData, adPosData, selfTestData, toAuditData } = props;
    this.state = {
      steps: getStepInfo(
        tabType,
        appData,
        adPosData,
        selfTestData,
        toAuditData,
      ),
      appData,
      adPosData,
      selfTestData,
      toAuditData,
      jumpTo: -1,
    };
    this.getComponentMethodArray = [
      this.getAppComponent,
      this.getAdPosComponent,
      this.getSelfTestComponent,
      this.getToAuditComponent,
    ];
  }

  componentWillReceiveProps({
    tabType,
    appData,
    adPosData,
    selfTestData,
    toAuditData,
  }) {
    const steps = getStepInfo(
      tabType,
      appData,
      adPosData,
      selfTestData,
      toAuditData,
    );
    const nextState = {
      steps,
      appData,
      adPosData,
      selfTestData,
      toAuditData,
    };
    const {
      jumpTo,
      appData: appData2,
      adPosData: adPosData2,
      selfTestData: selfTestData2,
      toAuditData: toAuditData2,
    } = this.state;
    if (jumpTo >= 0) {
      const tmp = [appData, adPosData, selfTestData, toAuditData].slice(
        4 - steps.length,
      );
      const tmp2 = [appData2, adPosData2, selfTestData2, toAuditData2].slice(
        4 - steps.length,
      );
      if (
        jumpTo < tmp.length &&
        tmp2[jumpTo].status === OperationStatus.saving &&
        tmp[jumpTo].status === OperationStatus.save_success
      ) {
        nextState.jumpTo = -1;
      }
    }

    this.setState(nextState);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const {
      tabType,
      appData,
      adPosData,
      selfTestData,
      toAuditData,
    } = this.props;
    const { jumpTo } = this.state;
    return (
      tabType !== nextProps.tabType ||
      appData !== nextProps.appData ||
      adPosData !== nextProps.adPosData ||
      selfTestData !== nextProps.selfTestData ||
      toAuditData !== nextProps.toAuditData ||
      jumpTo !== nextState.jumpTo
    );
  };

  // 点击左侧的导航
  onGoToStep = stepIndex => {
    this.setState(
      {
        jumpTo: stepIndex,
      },
      () => {
        const { steps } = this.state;
        const {
          onEditApp,
          onEditAdPos,
          onEditSelfTest,
          onEditToAudit,
        } = this.props;
        // eslint-disable-next-line
      const editActionArr = [onEditApp, onEditAdPos, onEditSelfTest, onEditToAudit].slice(4 - steps.length);

        if (stepIndex < editActionArr.length) {
          editActionArr[stepIndex]();
        }
      },
    );
  };

  getAppComponent = () => {
    const { appData } = this.state;
    const { onAppDataChange, onSaveAppData } = this.props;
    console.info(appData, '打印appData');
    return (
      <App
        {...appData}
        onDataChange={onAppDataChange}
        onSaveData={onSaveAppData}
        onGoToAdList={this.onGoToAdList}
      />
    );
  };

  getAdPosComponent = () => {
    const { appData, adPosData } = this.state;
    console.info(appData, adPosData, '打印新建广告位页面获取到的直');
    return (
      <AdSlot
        {...adPosData}
        // onDataChange={this.onAppDataChange}
        // onSaveData={this.onSaveAppData}
        // onGoToAdList={this.onGoToAdList}
      />
    );
  };

  getSelfTestComponent = () => {
    const { selfTestData } = this.state;
    console.info(selfTestData, '打印自测页面中的值');
    return <div>自测页面</div>;
  };

  getToAuditComponent = () => {
    const { toAuditData } = this.state;
    console.info(toAuditData, '打印提交审核页面中的值');
    return <div>提交审核页面</div>;
  };

  // 左侧导航当前所在项
  getCurrentIndex = steps => {
    const { length } = steps;
    if (length === 4) {
      if (steps[1] === OperationStatus.initial) {
        return 0;
      }
      if (steps[2] === OperationStatus.initial) {
        return 1;
      }
      if (steps[3] === OperationStatus.initial) {
        return 2;
      }
      return 3;
    }
    if (length === 3) {
      if (steps[1] === OperationStatus.initial) {
        return 0;
      }
      if (steps[2] === OperationStatus.initial) {
        return 1;
      }
      return 2;
    }
    if (length === 2) {
      if (steps[1] === OperationStatus.initial) {
        return 0;
      }
      return 1;
    }
    return 0;
  };

  getProgress = () => {
    const { appData, adPosData } = this.state;
    switch (this.props.tabType) {
      case AppTabTypes.appTab: {
        if (!appData.appTag) {
          return 0;
        }
        if (!adPosData.adPosTag) {
          return 1;
        }
        return 2;
      }
      case AppTabTypes.appAdPosTab: {
        if (!adPosData.adPosTag) {
          return 0;
        }
        return 1;
      }
      default:
        return 0;
    }
  };

  render() {
    const { steps, jumpTo } = this.state;
    const progress = this.getProgress();
    const getComponentMethods = this.getComponentMethodArray.slice(
      4 - steps.length,
    );
    const currentIndex = jumpTo >= 0 ? jumpTo : this.getCurrentIndex(steps);

    return (
      <section className="root">
        <div className={s.container}>
          <NewAdSteps
            total={steps.length}
            current={currentIndex}
            progress={progress}
            onGoToStep={this.onGoToStep}
          />
          {getComponentMethods[currentIndex]()}
        </div>
      </section>
    );
  }
}

export default withStyles(s)(New);
