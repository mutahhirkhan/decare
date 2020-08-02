import { ENABLE_METAMASK, APP_LOADED } from '../actions/actionTypes';

export const metamaskEnabled = () => {
    return {
        type: ENABLE_METAMASK
    }
}

export const appLoaded = () => {
    return {
        type: APP_LOADED,
    }
}