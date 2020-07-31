import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, SIGN_OUT } from '../actions/actionTypes';
import { showError } from '../actions/alertAction';
import axios from 'axios';
import firebasedb from '../../axios/firebasedb';

export const authStart = () => {
    return {
        type: AUTH_START,
    }
}

export const authSuccess = (_userId, _token) => {
    return {
        type: AUTH_SUCCESS,
        payload: { userId: _userId, token: _token }
    }
}

export const authFail = () => {
    return {
        type: AUTH_FAIL
    }
}

export const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: SIGN_OUT
    };
};

export const authenticate = async (email, password, isSignup, dispatch) => {
    try {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3LNbwxHFGGPl5jKXG3CjBVBrER350fR8';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3LNbwxHFGGPl5jKXG3CjBVBrER350fR8';
        }
        const response = await axios.post(url, authData);
        const orderData = { userId: response.data.localId };
        await firebasedb.post('/users.json?auth=' + response.data.idToken, orderData);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.localId, response.data.idToken,));
        dispatch(startAuthTimeout(response.data.expiresIn));
        return true;
    } catch (e) {
        dispatch(authFail());
        // dispatch(showError(e.response.data.error));
        return false;
    }

};

export const checkAuthState = (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(signOut());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(signOut());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
            dispatch(startAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}

export const startAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(signOut());
        }, expirationTime * 1000);
    };
};