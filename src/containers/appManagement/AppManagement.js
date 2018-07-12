import { connect } from 'react-redux';
import appManagement from '../../pages/appManagement/list';
import { goToAppAdposList } from '../../actions/AppManagement/list';

const mapStateToProps = state => {
  const { navTab: { tabType }, queryConditions } = state.appManagement.list;
  return { tabType, queryCondition: queryConditions[tabType] };
};

const mapDispatchToProps = dispatch => ({
  onGoToAppAdposList(tabItem) {
    dispatch(goToAppAdposList(tabItem));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(appManagement);
