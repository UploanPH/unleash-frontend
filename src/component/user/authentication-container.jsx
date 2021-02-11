import { connect } from 'react-redux';
import AuthenticationComponent from './authentication-component';
import { unsecureLogin, passwordLogin, uploanLogin } from '../../store/user/actions';
import { fetchFeatureToggles } from '../../store/feature-actions';
import { fetchUIConfig } from '../../store/ui-config/actions';
import { fetchUser } from '../../store/user/actions';


const mapDispatchToProps = {
    unsecureLogin,
    passwordLogin,
    uploanLogin,
    fetchFeatureToggles,
    fetchUIConfig,
    fetchUser
};

const mapStateToProps = state => ({
    user: state.user.toJS(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationComponent);
