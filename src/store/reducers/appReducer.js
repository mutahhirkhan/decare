import alertReducer from './alertReducer';
import campaignReducer from './campaignReducer';

export const appReducer = ({ alertList, campaigns }, action) => {
    return {
        alertList: alertReducer(alertList, action),
        campaigns: campaignReducer(campaigns, action)
    }
}