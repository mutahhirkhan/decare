import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, SIGN_OUT } from '../actions/actionTypes';

const initialeState = [{
    isAuthenticated: true,
    userId: null,
    token: null,
    loading: false
}]

export default (state = initialeState, action) => {
    switch (action.type) {
        case AUTH_START:
            return [{
                ...state,
                loading: true
            }];
        case AUTH_SUCCESS:
            return [{
                ...state,
                isAuthenticated: false,
                loading: false,
                userId: action.payload.userId,
                token: action.payload.token
            }];
        case AUTH_FAIL:
            return [{
                ...state,
                isAuthenticated: false,
                loading: false
            }];
        case SIGN_OUT:
            return [{
                ...state,
                isAuthenticated: false,
                loading: false,
                userId: null,
                token: null
            }];
        default:
            return state;
    }
}