import {
    ADD_TRANSACTION_STATE,
    SET_TRANSACTION_STATE,
} from '../actions/actionTypes';

const initialeState = {}

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
                [action.payload.key]: action.payload.value
            };
        default:
            return state;
    }
}