import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, SIGN_OUT } from '../actions/actionTypes';

const initialeState = {
    isAuthenticated: true,
    loading: false
}

export default (state = initialeState, action) => {
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                loading: true
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
            };
        case AUTH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading: false
            };
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
}