import * as actionTypes from './types'
import axios from 'axios'

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
    console.log('called from checkAuthTimeOut')
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
            const token = res.data.token;
            const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationTime', expirationTime);
            localStorage.setItem('username', res.data.user.username);
            dispatch(authSuccess(token, res.data.user.username));
            dispatch(checkAuthTimeOut(3600));
        })
        .catch(err => {
            if(err.resonse) {
                dispatch(authFail(err.response.statusText))
            } else {
                dispatch(authFail('Error to authenticate user.'))
            }
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('auth/register/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
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
            if(err.resonse) {
                dispatch(authFail(err.response.statusText))
            } else {
                dispatch(authFail('Error to authenticate user.'))
            }
        })
    }
}

export const authLogout = () => {
    console.log('called from doLogout');
    return dispatch => {
        dispatch(logout());
    }
}

export const logout = () => {
    console.log('called from logout')
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('username');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheckState = () => {
    return dispatch => {
        console.log('called from authCheckState')
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
