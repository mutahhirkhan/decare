import {
    ADD_TRANSACTION_STATE,
    SET_TRANSACTION_STATE,
} from '../actions/actionTypes';

const initialeState = {
    isTransactionRunning: false
}

export default (state = initialeState, action) => {
    switch (action.type) {
        case ADD_TRANSACTION_STATE:
            return {
                ...state,
                [action.payload]: !!state[action.payload]
            };
        case SET_TRANSACTION_STATE:
            return {
                ...state,
                [action.payload.key]: action.payload.value,
                isTransactionRunning: getIsTransactionRunning(state, action)
            };
        default:
            return state;
    }
}

const getIsTransactionRunning = (values, action) => {
    values[action.payload.key] = action.payload.value
    const keys = Object.keys(values);
    let result = false;
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] !== 'isTransactionRunning' && values[keys[i]] === true) {
            result = true;
            break;
        }
    }
    return result;
}