import { ENABLE_METAMASK, APP_LOADED, SET_CURRENT_ACCOUNT } from './actionTypes';

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

export const setCurrentAccount = (accountAddress) => {
    return {
        type: SET_CURRENT_ACCOUNT,
        payload: accountAddress
    }
}