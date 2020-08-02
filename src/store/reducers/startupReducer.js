import { ENABLE_METAMASK, APP_LOADED } from '../actions/actionTypes';

const initialeState = {
    isMetamaskEnabled: false,
    isAppLoaded: false
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
        default:
            return state;
    }
}