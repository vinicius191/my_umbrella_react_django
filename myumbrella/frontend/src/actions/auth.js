import * as actionTypes from './types'
import axios from 'axios'
import * as Utils from './utils'
import {favLogout, favCheck} from './favourite';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

const checkAuthTimeOut = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 100)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            var token = res.data.token;
            var expirationTime = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationTime', expirationTime);
            localStorage.setItem('username', res.data.user.username);
            //console.log('TOKEN', token)
            //dispatch(favCheck(token));
            dispatch(authSuccess(token, res.data.user.username));
            dispatch(checkAuthTimeOut(3600));
        })
        .catch(err => {
            if(err.response) {
                if(err.response.data["non_field_errors"] !== undefined) {
                    dispatch(authFail(err.response.data.non_field_errors[0]))
                } else {
                    dispatch(authFail(err.response.statusText))
                }
            } else {
                dispatch(authFail('Error to authenticate user.'))
            }
        })
    }
}

export const authSignup = (_data) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('auth/register/', {
            username: _data.username,
            email: _data.email,
            password: _data.password,
            password2: _data.password2
        })
        .then(res => {
            const token = res.data.token;
            const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationTime', expirationTime);
            localStorage.setItem('username', res.data.user.username);
            dispatch(authSuccess(token, res.data.user.username));
            dispatch(checkAuthTimeOut(3600));
        })
        .catch(err => {
            if(err.response !== null) {
                let str_error = Utils.strAuthHandler(err.response.data, "create user.");
                dispatch(authFail(str_error))
            } else {
                dispatch(authFail('Error to create user.'))
            }
        })
    }
}

export const authLogout = () => {
    return dispatch => {
        dispatch(logout());
        dispatch(favLogout());
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('username');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token === 'undefined') {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationTime'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, username));
                dispatch(checkAuthTimeOut( (expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
}