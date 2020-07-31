import alertReducer from './alertReducer';
import campaignReducer from './campaignReducer';
import authReducuer from './authReducer';
import metamaskReducer from './metamaskReducer';

export const appReducer = ({ alertList, campaigns, auth, metamask }, action) => {
    return {
        alertList: alertReducer(alertList, action),
        campaigns: campaignReducer(campaigns, action),
        auth: authReducuer(auth, action),
        metamask: metamaskReducer(metamask, action)
    }
}