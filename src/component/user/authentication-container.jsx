import { connect } from 'react-redux';
import AuthenticationComponent from './authentication-component';
import { unsecureLogin, passwordLogin } from '../../store/user/actions';
import { loadInitalData } from './../../store/loader';

const mapDispatchToProps = {
    unsecureLogin,
    passwordLogin,
    loadInitalData,
};

const mapStateToProps = state => ({
    user: state.user.toJS(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationComponent);
