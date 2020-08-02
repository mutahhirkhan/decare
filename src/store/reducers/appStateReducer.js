import { ENABLE_METAMASK, APP_LOADED, SET_CURRENT_ACCOUNT } from '../actions/actionTypes';

const initialeState = {}

export default (state = initialeState, action) => {
    switch (action.type) {
        case ENABLE_METAMASK:
            return {
                ...state,
                isMetamaskEnabled: true
            };
        case APP_LOADED:
            return {
                ...state,
                isAppLoaded: true
            };
        case SET_CURRENT_ACCOUNT:
            return {
                ...state,
                currentAccount: action.payload
            };
        default:
            return state;
    }
}