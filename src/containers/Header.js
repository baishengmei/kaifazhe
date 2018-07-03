import { connect } from 'react-redux';
import { logout } from '../actions/Auth';
import Header from '../components/Header';

const mapStateToProps = state => ({
  username: state.auth.user && state.auth.user.email,
});

const mapDispatchToProps = dispatch => ({
  onLogout() {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
