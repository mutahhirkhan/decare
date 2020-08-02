import { SET_USER_DETAILS, SET_CURRENT_ACCOUNT } from '../actions/actionTypes';

export const setUserDetails = (user) => {
    return {
        type: SET_USER_DETAILS,
        payload: user
    }
}

export const setCurrentAccount = (address) => {
    return {
        type: SET_CURRENT_ACCOUNT,
        payload: address
    }
}