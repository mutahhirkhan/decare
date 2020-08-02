import { SET_USER_DETAILS } from '../actions/actionTypes';

const initialeState = {}

export default (state = initialeState, action) => {
    switch (action.type) {
        case SET_USER_DETAILS:
            console.log('from user reducer', action);
            return {
                ...action.payload
            };
        default:
            return state;
    }
}