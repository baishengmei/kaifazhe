import { connect } from 'react-redux';
import appManagement from '../../pages/appManagement/list';
import {
  getAppAndAdposList,
  appAndAdposListQueryConditionChange,
} from '../../actions/AppManagement/list';

const mapStateToProps = state => {
  const {
    navTab: { tabType },
    queryConditions,
    queryLists,
  } = state.appManagement.list;
  return {
    tabType,
    queryCondition: queryConditions[tabType],
    dataList: queryLists[tabType],
  };
};

const mapDispatchToProps = dispatch => ({
  getAppAndAdposList(subType, id) {
    dispatch(getAppAndAdposList(subType, id));
  },
  onSearch(subType, keyword) {
    dispatch(
      appAndAdposListQueryConditionChange(subType, {
        type: 'keyword',
        keyword,
      }),
    );
  },
  onOsTypeChange(subType, selectedOsType) {
    dispatch(
      appAndAdposListQueryConditionChange(subType, {
        type: 'selectedOsType',
        selectedOsType,
      }),
    );
  },
  onStatusChange(subType, selectedStatus) {
    dispatch(
      appAndAdposListQueryConditionChange(subType, {
        type: 'selectedStatus',
        selectedStatus,
      }),
    );
  },
  onOperateStatusChange(subType, selectedOperateStatus) {
    dispatch(
      appAndAdposListQueryConditionChange(subType, {
        type: 'selectedOperateStatus',
        selectedOperateStatus,
      }),
    );
  },
  onAuditStatusChange(subType, selectedAuditStatus) {
    dispatch(
      appAndAdposListQueryConditionChange(subType, {
        type: 'selectedAuditStatus',
        selectedAuditStatus,
      }),
    );
  },
  onObjectChange(subType, selectedObject) {
    dispatch(
      appAndAdposListQueryConditionChange(subType, {
        type: 'selectedObject',
        selectedObject,
      }),
    );
  },
  onDateRangeChange(subType, dateRange) {
    dispatch(
      appAndAdposListQueryConditionChange(subType, {
        type: 'dateRange',
        dateRange,
      }),
    );
  },
  onPageSizeChange(subType, pageNo, pageSize) {
    dispatch(
      appAndAdposListQueryConditionChange(subType, {
        type: 'pageSize',
        pageNo,
        pageSize,
      }),
    );
  },
  onPageNoChange(subType, pageNo) {
    dispatch(
      appAndAdposListQueryConditionChange(subType, {
        type: 'pageNo',
        pageNo,
      }),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(appManagement);
