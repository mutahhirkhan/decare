import alertReducer from './alertReducer';
import campaignReducer from './campaignReducer';
import authReducuer from './authReducer';
import userReducer from './userReducer';
import startupReducer from './startupReducer';

export const appReducer = ({ alertList, campaigns, auth, startupState, user }, action) => {
    return {
        alertList: alertReducer(alertList, action),
        campaigns: campaignReducer(campaigns, action),
        auth: authReducuer(auth, action),
        user: userReducer(user, action),
        startupState: startupReducer(startupState, action)
    }
}