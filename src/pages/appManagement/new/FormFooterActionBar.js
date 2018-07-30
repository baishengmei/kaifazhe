import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal } from 'antd';
import s from './index.css';
import { OperationStatus, saveButtonText } from '../../../constants/MenuTypes';

class FormFooterActionBar extends React.Component {
  static propTypes = {
    status: PropTypes.oneOf(Object.keys(OperationStatus)).isRequired,
    cancelHintText: PropTypes.string,
    saveButtonValid: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  static defaultProps = {
    cancelHintText: '是否取消？',
  };

  state = {
    visible: false,
  };

  onClickCancel = () => {
    this.setState({
      visible: true,
    });
  };

  onSave = e => {
    const { status } = this.props;
    // 不能再次触发的状态
    if (
      status === OperationStatus.editing ||
      status === OperationStatus.load_success ||
      status === OperationStatus.save_fail
    ) {
      this.props.onSave(e.target.innerText);
    }
  };

  onConfirmCancel = () => {
    this.setState({
      visible: false,
    });
    setTimeout(this.props.onCancel, 300);
  };

  onCancelCancel = () => {
    this.setState({
      visible: false,
    });
  };

  getSaveIcon = (status, valid) => {
    switch (status) {
      case OperationStatus.saving:
        return (
          <Icon
            type="sync"
            style={{
              animation: 'loadingCircle 1s infinite linear',
            }}
          />
        );
      case OperationStatus.save_success:
        return <Icon type="check-circle" />;
      case OperationStatus.save_fail:
        return (
          <Icon
            type="close-circle"
            style={{ color: valid ? '#f04134' : '#e6e6e6' }}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { status, cancelHintText, saveButtonValid } = this.props;

    return (
      <div className={s.actionBar}>
        <Button
          size="large"
          type="primary"
          disabled={!saveButtonValid}
          onClick={this.onSave}
        >
          {this.getSaveIcon(status, saveButtonValid)}
          {saveButtonText[0]}
        </Button>
        <Button size="large" disabled={!saveButtonValid} onClick={this.onSave}>
          {this.getSaveIcon(status, saveButtonValid)}
          {saveButtonText[1]}
        </Button>
        <Button size="large" onClick={this.onClickCancel}>
          取消
        </Button>
        <Modal
          wrapClassName={s['cancel-confirm-wrapper']}
          className="ant-confirm"
          visible={this.state.visible}
          width={400}
          closable={false}
          footer={null}
          maskClosable={false}
          style
        >
          <div className="ant-confirm-body">
            <Icon type="exclamation-circle" style={{ color: '#ffbf00' }} />
            <div className="ant-confirm-title">提示</div>
            <div className="ant-confirm-content">{cancelHintText}</div>
          </div>
          <div className="ant-confirm-btns">
            <Button onClick={this.onCancelCancel}>取消</Button>
            <Button type="primary" onClick={this.onConfirmCancel}>
              确定
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default FormFooterActionBar;
