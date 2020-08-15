import { SET_USER_DETAILS } from '../actions/actionTypes';

export const setUserDetails = (user) => {
    return {
        type: SET_USER_DETAILS,
        payload: user
    }
}