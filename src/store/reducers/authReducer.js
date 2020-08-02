import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, SIGN_OUT } from '../actions/actionTypes';

const initialeState = {
    isAuthenticated: true,
    isLoading: false
}

export default (state = initialeState, action) => {
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                isLoading: true
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
            };
        case AUTH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false
            };
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}