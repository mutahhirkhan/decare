import { ADD_CAMPAIGN } from '../actions/actionTypes';

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

