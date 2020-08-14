import alertReducer from './alertReducer';
import authReducuer from './authReducer';
import userReducer from './userReducer';
import appStateReducer from './appStateReducer';
import transactionStatesReducer from './transactionStatesReducer';

export const appReducer = ({ alertList, auth, appState, user, transactionStates }, action) => {
    return {
        alertList: alertReducer(alertList, action),
        auth: authReducuer(auth, action),
        user: userReducer(user, action),
        appState: appStateReducer(appState, action),
        transactionStates: transactionStatesReducer(transactionStates, action)
    }
}