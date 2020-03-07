import * as actionTypes from './types'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeOut = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout)
        }, expirationTime * 100)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('localhost/auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key;
            const expirationTime = new Date(new Date.getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeOut(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('localhost/auth/register/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            const token = res.data.key;
            const expirationTime = new Date(new Date.getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeOut(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === 'undefined') {
            distach(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime <= new Date()) {
                dispatch(location());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeOut( (expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
}
