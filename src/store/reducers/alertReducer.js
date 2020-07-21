import { ALERT } from '../actions/actionTypes';
import { v4 as guid } from 'uuid';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case ALERT:
            return [
                ...state,
                { type: action.payload.type, message: action.payload.message, wasShown: false, id: guid() }
            ]
        default:
            return state;
    }
}

