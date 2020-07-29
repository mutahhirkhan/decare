import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from './actionTypes';

const initialeState = []

export default (state = initialeState, action) => {
    switch (action.type) {
        case ADD_CAMPAIGN:
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
}