import React, { createContext, useState, useContext } from 'react';
import { v4 as guid } from 'uuid';

const AlertContext = createContext({
    alerts: [],
    showError: () => { },
    showMessage: () => { },
    showWarning: () => { },
    showSuccess: () => { },
});

export default props => {
    const [alertList, setAlertList] = useState([]);

    const error = (message) => {

        setAlertList(currentAlertList => {
            return [
                ...currentAlertList,
                { type: 'ERROR', message: message, wasShown: false, id: guid() }
            ]
        });

    }

    const message = (message) => {

        setAlertList(currentAlertList => {
            return [
                ...currentAlertList,
                { type: 'MESSAGE', message: message, wasShown: false, id: guid() }
            ]
        });

    }

    const warning = (message) => {

        setAlertList(currentAlertList => {
            return [
                ...currentAlertList,
                { type: 'WARNING', message: message, wasShown: false, id: guid() }
            ]
        });

    }

    const success = (message) => {

        setAlertList(currentAlertList => {
            return [
                ...currentAlertList,
                { type: 'SUCCESS', message: message, wasShown: false, id: guid() }
            ]
        });
    }

    return (
        <AlertContext.Provider value={
            {
                alerts: alertList,
                showError: error,
                showMessage: message,
                showSuccess: success,
                showWarning: warning
            }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export const useAlert = () => useContext(AlertContext);