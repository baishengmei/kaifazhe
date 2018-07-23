import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu, Button, Icon, message, Modal } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';
import {
  TrackMultipleOperationItems,
  AppTabTypes,
} from '../../../constants/MenuTypes';
// import { componentUpdateByState } from '../../../core/utils';

const { Item: MenuItem } = Menu;
class MultipleOperationMenu extends Component {
  static propTypes = {
    tabType: PropTypes.oneOf(Object.keys(AppTabTypes)).isRequired,
    // dataListStatus: PropTypes.string.isRequired,
    selectedRowKeys: PropTypes.arrayOf(PropTypes.number).isRequired,
    // selectedRows: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMultipleOperation: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    const { tabType } = this.props;
    // this.state = {
    //   tabType,
    // dataListStatus,
    // };
    this.multipleOperationMenu = this.getMultipleOperationMenu(tabType);
    // this.shouldComponentUpdate = componentUpdateByState;
  }

  onClickMultipleOperationMenu = ({ key: value }) => {
    const operation = TrackMultipleOperationItems.find(
      it => it.value === value,
    );
    const { tabType, selectedRowKeys, onMultipleOperation } = this.props;
    if (selectedRowKeys.length > 0) {
      if (operation === TrackMultipleOperationItems[2]) {
        // 批量删除
        Modal.confirm({
          iconType: 'exclamation-circle',
          title: '提示',
          content: `当前已选中 ${selectedRowKeys.length} 条数据，确定删除吗？`,
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            onMultipleOperation(tabType, selectedRowKeys, operation);
          },
        });
      } else {
        onMultipleOperation(tabType, selectedRowKeys, operation);
      }
    } else {
      message.warning('请先勾选下表中的数据');
    }
  };

  getMultipleOperationMenu = () => {
    const items = TrackMultipleOperationItems;
    return (
      <Menu selectedKeys={[]} onClick={this.onClickMultipleOperationMenu}>
        {items.map(item => <MenuItem key={item.value}>{item.name}</MenuItem>)}
      </Menu>
    );
  };

  render() {
    // const { dataListStatus } = this.state;
    // const { selectedRows = [] } = this.props;
    // const disableMultipleOperation =
    //   dataListStatus === OperationStatus.loading ||
    //   dataListStatus === OperationStatus.saving;

    const disableMultipleOperation = false;
    return (
      <div className={s.select}>
        <Dropdown trigger={['click']} overlay={this.multipleOperationMenu}>
          <Button disabled={disableMultipleOperation}>
            批量操作 <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default withStyles(s)(MultipleOperationMenu);
