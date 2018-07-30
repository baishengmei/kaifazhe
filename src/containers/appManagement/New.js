import { connect } from 'react-redux';
import New from '../../pages/appManagement/new';
import {
  editingApp,
  editAdPos,
  editSelfTest,
  editToAudit,
  appDataChange,
  saveAppData,
} from '../../actions/AppManagement/new';

const mapStateToProps = state => {
  const { app, adPos, selfTest, toAudit } = state.appManagement.entity;
  const { tabType } = state.appManagement.list.navTab;
  return {
    tabType,
    appData: app,
    adPosData: adPos,
    selfTestData: selfTest,
    toAuditData: toAudit,
  };
};

const mapDispatchToProps = dispatch => ({
  onEditApp() {
    dispatch(editingApp());
  },
  onEditAdPos() {
    dispatch(editAdPos());
  },
  onEditSelfTest() {
    dispatch(editSelfTest());
  },
  onEditToAudit() {
    dispatch(editToAudit());
  },
  onAppDataChange(sectionType, itemType, itemValue) {
    dispatch(appDataChange(sectionType, itemType, itemValue));
  },
  onSaveAppData(saveType) {
    dispatch(saveAppData(saveType));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(New);
