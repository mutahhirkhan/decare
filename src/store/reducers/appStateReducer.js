import {
    ENABLE_METAMASK, APP_LOADED,
    SET_CURRENT_ACCOUNT,
    SET_IS_USER_ACCOUNT_SELECTED,
    SET_CURRENT_NETWORK
} from '../actions/actionTypes';

const initialeState = {
    isMetamaskEnabled: false,
    isAppLoaded: false,
    currentAccount: null,
    isUserAccountSelected: false
}

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
        case SET_CURRENT_NETWORK:
            return {
                ...state,
                currentNetwork: action.payload
            };
        case SET_IS_USER_ACCOUNT_SELECTED:
            return {
                ...state,
                isUserAccountSelected: action.payload
            };
        default:
            return state;
    }
}