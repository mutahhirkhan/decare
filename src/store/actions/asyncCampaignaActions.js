import { ADD_CAMPAIGN } from './actionTypes';
import { CONTRACT_ABI, CONTRACT_BYTECODE } from '../../contract/DonationCampaignContract'

import Web3 from 'web3';
import db from '../../axios/firebasedb'
import { showError, showMessage, showSuccess, showWarning } from './alertAction';

let web3 = new Web3(Web3.givenProvider);

const getCurrrentAccount = async () => {
    //Get current active account
    const account = await web3.eth.getAccounts();
    console.log(account);
    return account[0].toString();
}

const uploadCampaign = async (campaign, dispatch) => {
    try {
        await db.post('/campaigns.json', campaign);
    } catch (e) {
        dispatch(showError(e));
    }
}

export const addCampaign = async (campaign, dispatch) => {
    try {
        dispatch({ type: ADD_CAMPAIGN });

        await Web3.givenProvider.enable();

        let currentAccount = await getCurrrentAccount();

        console.log(`Selected Account: ${currentAccount}`);

        //create the contract instance
        let contract = await new web3.eth.Contract(CONTRACT_ABI);

        console.log('Deploying Contract....');

        //calculate the epoch time
        /* global BigInt */
        let time = Math.round((campaign.endDate.getTime() - campaign.startDate.getTime()) / 1000);
        let epochTime = BigInt(time);

        let newContract = await contract.deploy({
            data: CONTRACT_BYTECODE,
            arguments: [epochTime, campaign.amount]
        })
            //Sending Transaction
            .send(
                {
                    from: currentAccount,
                    gas: 1500000,
                    gasPrice: '3000000000'//its should be string, otherwise it will throw the payload error
                })
            //Transaction was success 
            .on('transactionHash', txHash => {
                campaign.transactionHash = txHash;
                console.log(`Tx Hash: ${txHash}`);
            })
            .on('receipt', function (receipt) {
                console.log(receipt.contractAddress) // contains the new contract address
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                console.log(confirmationNumber, receipt);
            });

        console.log(`Deployed Contract Address: ${newContract._address}`);
        campaign.address = newContract._address;
        campaign.owner = currentAccount;

        //upload campaign data to firebase
        await uploadCampaign(campaign);

        //update the state
        dispatch({
            type: ADD_CAMPAIGN,
            payload: campaign
        });
        dispatch(showSuccess('Campaign Added Successfuly'));
        return true;
    }
    //handle error
    catch (e) {
        console.log('An Error Accured: ', e.message);
        dispatch(showError('Failed to created contract!'));
        return false;
    }
}
