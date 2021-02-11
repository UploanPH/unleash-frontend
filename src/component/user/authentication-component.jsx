import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-mdl';
import { setStellarOauthToken, timeout } from '../../data/helper'
import { Redirect } from 'react-router-dom';
import Features from '../../page/features';
const SIMPLE_TYPE = 'unsecure';
const PASSWORD_TYPE = 'password';
const UPLOAN_TYPE = 'uploan';

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

class AuthComponent extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        unsecureLogin: PropTypes.func.isRequired,
        passwordLogin: PropTypes.func.isRequired,
        uploanLogin: PropTypes.func.isRequired,
        fetchFeatureToggles: PropTypes.func.isRequired,
        fetchUIConfig: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        fetchUser: PropTypes.func.isRequired,
    };

    state = {
        isStellarAuthLoaded: false
    }

    async componentDidMount() {
        setStellarOauthToken()
        await timeout(3000)

        this.props.fetchUser();

        this.setState({
            isStellarAuthLoaded: true
        })
    }

    render() {
        let { isStellarAuthLoaded } = this.state
        return (
            <div key={isStellarAuthLoaded}>
                {isStellarAuthLoaded && <Redirect to="/features" component={Features} />}
                {!isStellarAuthLoaded &&
                    (
                        <div style={customStyles.overlay}>
                            <Spinner style={customStyles.content} />
                        </div>
                    )
                }
            </div>
        )
    }

};

export default AuthComponent;
