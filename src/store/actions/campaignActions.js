import * as ethService from '../../services/ethereum/ethService';
import * as dbService from '../../services/firebase/databaseService';
import { showError, showSuccess } from './alertAction';
import { setUserDetails } from '../../store/actions/userActions';

export const createCampaign = async (campaign, user, dispatch) => {
    try {
        //call campaign factory to create a new campaign contract
        const rawAddress = await ethService
            .createCampaign(campaign.title, campaign.description, campaign.amount, campaign.createTimestamp, campaign.closeTimestamp);
        const address = ethService.toChecksumAddress(rawAddress);

        //save to firebase
        const key = await dbService.addUserCampaign(user.address, address);

        //add campaign to user
        const updatedUser =
        {
            ...user,
            campaigns:
            {
                ...user.campaigns, [key]: address
            }
        }
        
        //update user object at state level
        dispatch(setUserDetails(updatedUser));

        //show success message
        dispatch(showSuccess('Campaign Added Successfuly'));

        //return the new campaign address to navigate to it
        return address;
    }
    catch (e) {
        dispatch(showError(`Something went wrong. Failed to created contract! ${e.message}`));
    }
}
