import { ADD_CAMPAIGN } from './actionTypes';
import * as ethService from '../../services/EthService';
import { showError, showMessage, showSuccess, showWarning } from './alertAction';

export const addCampaign = (campaign) => {
    return {
        type: ADD_CAMPAIGN,
        payload: campaign
    }
}

export const createCampaign = async (campaign, dispatch) => {
    try {
        //call campaign factory to create a new campaign contract
        let address = await ethService
            .createCampaign(campaign.title, campaign.description, campaign.amount, campaign.createTimestamp, campaign.closeTimestamp);

        //update the state
        dispatch(addCampaign(campaign));
        dispatch(showSuccess('Campaign Added Successfuly'));
        return address;
    }
    catch (e) {
        dispatch(showError(`Something went wrong. Failed to created contract! ${e.message}`));
    }
}
