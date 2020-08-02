import React, { createContext, useReducer, useContext } from 'react';
import { appReducer } from '../store/reducers/appReducer';

let initialState = {
    alertList: [],
    campaigns: [],
    auth: {
        isAuthenticated: true,
        isLoading: false
    },
    startupState: {
        isMetamaskEnabled: false,
        isAppLoaded: false,
    },
    user: {}
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