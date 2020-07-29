import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { appReducer } from '../store/reducers/appReducer';
import { enable } from '../services/EthService';

let initialState = {
    alertList: [],
    campaigns: [],
    isMetamaskEnabled: false
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    useEffect(() => {
        enable();
    }, [])

    const [state, dispatch] = useReducer(appReducer, initialState);

    return (<GlobalContext.Provider value={[state, dispatch]}>
        {children}
    </GlobalContext.Provider>);
}

export const useStore = () => useContext(GlobalContext);