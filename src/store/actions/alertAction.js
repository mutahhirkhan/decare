import { ALERT } from './actionTypes'

export const showMessage = (message) => {
    return {
        type: ALERT,
        payload: { message: message, type: 'MESSAGE' }
    }
}

export const showError = (message) => {
    return {
        type: ALERT,
        payload: { message: message, type: 'ERROR' }
    }
}

export const showWarning = (message) => {
    return {
        type: ALERT,
        payload: { message: message, type: 'WARNING' }
    }
}

export const showSuccess = (message) => {
    return {
        type: ALERT,
        payload: { message: message, type: 'SUCCESS' }
    }
}