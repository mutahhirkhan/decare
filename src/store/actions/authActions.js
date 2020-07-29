import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from './actionTypes';

export const authStart = (email, password) => {
    return {
        type: AUTH_START,
        payload: { email: email, password: password }
    }
}

export const authSuccess = () => {
    return {
        type: AUTH_SUCCESS
    }
}

export const authFail = () => {
    return {
        type: AUTH_FAIL
    }
}