import api from './api';
import { dispatchAndThrow } from '../util';
import { uploanUserToUnleashUser } from '../../store/api-helper';
import jwtDecode from 'jwt-decode'
export const UPDATE_USER = 'UPDATE_USER';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGIN = 'USER_LOGIN';
export const START_FETCH_USER = 'START_FETCH_USER';
export const ERROR_FETCH_USER = 'ERROR_FETCH_USER';
const debug = require('debug')('unleash:user-actions');

const updateUser = value => ({
    type: UPDATE_USER,
    value,
});

function handleError(error) {
    debug(error);
}

export function fetchUser() {
    debug('Start fetching user');
    return dispatch => {
        dispatch({ type: START_FETCH_USER });

        return api
            .fetchUser()
            .then(json => dispatch(updateUser(uploanUserToUnleashUser(json))))
            .catch(dispatchAndThrow(dispatch, ERROR_FETCH_USER));
    };
}

export function refreshUploanOAuthToken(path, data) {
    api.refreshUploanOAuthToken(path, data)
        .then(response => {
            sessionStorage.setItem('oauth', JSON.stringify(response))
        })
        .catch(err => {
            console.error(`Unable to refresh token due to ${err}`)
        });
}

export function unsecureLogin(path, user) {
    return dispatch => {
        dispatch({ type: START_FETCH_USER });

        return api
            .unsecureLogin(path, user)
            .then(json => dispatch(updateUser(json)))
            .catch(handleError);
    };
}

export function passwordLogin(path, user) {
    return dispatch => {
        dispatch({ type: START_FETCH_USER });

        return api
            .passwordLogin(path, user)
            .then(json => dispatch(updateUser(json)))
            .then(() => dispatch({ type: USER_LOGIN }));
    };
}

export function logoutUser() {
    return dispatch => {
        dispatch({ type: USER_LOGOUT });
        window.location = 'logout';
    };
}
