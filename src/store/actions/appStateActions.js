import {
    ENABLE_METAMASK,
    APP_LOADED,
    SET_CURRENT_ACCOUNT,
    SET_CURRENT_NETWORK,
    SET_IS_USER_ACCOUNT_SELECTED
} from './actionTypes';

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

export const setIsUserAccountSelected = (value) => {
    return {
        type: SET_IS_USER_ACCOUNT_SELECTED,
        payload: value
    }
}

export const setCurrentNetwork = (value) => {
    return {
        type: SET_CURRENT_NETWORK,
        payload: value
    }
}