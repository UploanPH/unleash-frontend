import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';

import Features from '../page/features';
import { routes } from './menu/routes';
import styles from './styles.module.scss';
import AuthenticationContainer from './user/authentication-container';
import MainLayout from './layout/main';
import { Spinner } from 'react-mdl';
import { setStellarOauthToken, timeout } from '../store/api-helper'
import { fetchUser } from '../store/user/actions';


const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 99999,
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        backgroundColor: 'transparent',
        padding: 0,
        overflow: 'none',
    },
};

class App extends PureComponent {
    static propTypes = {
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        user: PropTypes.object,
    };

    state = {
        isStellarAuthLoaded: false
    }

    async componentDidMount() {
        setStellarOauthToken()
        await timeout(3000)
        this.setState({
            isStellarAuthLoaded: true
        })
    }

    render() {
        let { isStellarAuthLoaded } = this.state

        if (!isStellarAuthLoaded) {
            return (
                <div style={customStyles.overlay}>
                    <Spinner style={customStyles.content} />
                </div>
            )
        }
        return (
            <div className={styles.container}>
                <MainLayout {...this.props}>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/features" component={Features} />} />
                        {routes.map(route => (
                            <Route key={route.path} path={route.path} component={route.component} />
                        ))}
                    </Switch>
                </MainLayout>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.toJS(),
});

export default connect(mapStateToProps)(App);
