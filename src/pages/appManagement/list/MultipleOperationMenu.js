import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Dropdown, Menu, Button, Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';
import { AppAdposStatus } from '../../../constants/MenuTypes';

const { Item: MenuItem } = Menu;
class MultipleOperationMenu extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    // tabType,
    // showMultipleBid: false,
    // ocpcPhase: '0',
    // showMultipleBudget: false,
    // showMultipleLink: false,
    // dataListStatus,
    // showBudgetError: false,
    // showLinkError: false,
    // };
    this.multipleOperationMenu = this.getMultipleOperationMenu();
    this.baseBid = '';
    // this.shouldComponentUpdate = componentUpdateByState;
    this.budget = '';
    this.link = '';
  }

  getMultipleOperationMenu = () => {
    const items = AppAdposStatus;
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
