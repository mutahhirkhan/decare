import { ENABLE_METAMASK } from '../actions/actionTypes';

const initialeState = {
    isEnabled: false
}

export default (state = initialeState, action) => {
    switch (action.type) {
        case ENABLE_METAMASK:
            return {
                isEnabled: true
            };
        default:
            return state;
    }
}