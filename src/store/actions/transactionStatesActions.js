import {
    ADD_TRANSACTION_STATE,
    SET_TRANSACTION_STATE,
} from './actionTypes';

export const addTransactionState = (key) => {
    return {
        type: ADD_TRANSACTION_STATE,
        payload: key
    }
}

export const setTransactionState = (value, key) => {
    return {
        type: SET_TRANSACTION_STATE,
        payload: { key: key, value: value }
    }
}