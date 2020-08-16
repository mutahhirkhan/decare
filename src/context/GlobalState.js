import React, { createContext, useReducer, useContext } from 'react';
import { appReducer } from '../store/reducers/appReducer';

let initialState = {
    alertList: [],
    auth: {
        isAuthenticated: false,
        isLoading: false
    },
    appState: {
        isMetamaskEnabled: false,
        isAppLoaded: false,
        currentAccount: null,
        //indicates if the selected metamask account address is the same as the 
        //account address of curently signed in user
        isUserAccountSelected: false,
        currentNetwork: null
    },
    user: {},
    transactionStates: {
        isTransactionRunning: false
    }
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return (<GlobalContext.Provider value={[state, dispatch]}>
        {children}
    </GlobalContext.Provider>);
}

export const useStore = () => useContext(GlobalContext);