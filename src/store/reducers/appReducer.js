import alertReducer from './alertReducer';
import campaignReducer from './campaignReducer';
import authReducuer from './authReducer';
import userReducer from './userReducer';
import appStateReducer from './appStateReducer';

export const appReducer = ({ alertList, campaigns, auth, appState, user }, action) => {
    return {
        alertList: alertReducer(alertList, action),
        campaigns: campaignReducer(campaigns, action),
        auth: authReducuer(auth, action),
        user: userReducer(user, action),
        appState: appStateReducer(appState, action)
    }
}