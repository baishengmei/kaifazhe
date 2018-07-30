import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';
import s from './index.css';
import {
  NewAppSettingItems,
  NewAdPosSettingItems,
  NewSelfTestSettingItems,
  NewToAuditSettingItems,
} from '../../../constants/MenuTypes';
import { classnames } from '../../../core/utils';

const { Step } = Steps;

class NewAdSteps extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    onGoToStep: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const { total, current, progress } = this.props;
    return (
      total !== nextProps.total ||
      current !== nextProps.current ||
      progress !== nextProps.progress
    );
  }

  getStepNodes = (total, progress, current) =>
    [
      {
        title: '新建应用',
        desc: NewAppSettingItems.map(item => item.name),
      },
      {
        title: '新建广告位',
        desc: NewAdPosSettingItems.map(item => item.name),
      },
      {
        title: '集成与自测',
        desc: NewSelfTestSettingItems.map(item => item.name),
      },
      {
        title: '提交审核',
        desc: NewToAuditSettingItems.map(item => item.name),
      },
    ]
      .slice(4 - total)
      .map(({ title, desc }, i) => {
        const titleProps = {};
        const stepProps = {};
        if (i <= progress) {
          titleProps.className = s['step-title--jumpable'];
          titleProps.onClick = e => {
            e.preventDefault();
            e.stopPropagation();
            this.props.onGoToStep(i);
          };
        }
        if (i >= current && i < progress) {
          stepProps.className = classnames({
            [s['step--editable']]: true,
            [s[`step-${i + 1}`]]: true,
          });
        }

        return (
          <Step
            {...stepProps}
            key={title}
            title={<div {...titleProps}>{title}</div>}
            description={
              <div {...titleProps}>
                {desc.map(txt => <div key={txt}>{txt}</div>)}
              </div>
            }
          />
        );
      });

  render() {
    const { total, current, progress } = this.props;

    return (
      <Steps
        className={s.steps}
        direction="vertical"
        size="small"
        current={progress}
      >
        {this.getStepNodes(total, progress, current)}
      </Steps>
    );
  }
}

export default NewAdSteps;
