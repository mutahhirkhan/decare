import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_BYTECODE } from '../../contract/DonationCampaignContract';
import { error } from '../actions/errorAction';
import { addCampaign } from './asyncCampaignaActions';


export const loadWeb3 = async (dispatch) => {
    try {
        console.log("Web3.givenProvider = ", Web3.givenProvider);
        if (Web3.givenProvider) {
            const web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable();
        }
        else {
            dispatch(error("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"));
        }
    }
    catch (error) {
        console.log("Error in loading Web3 = ", error);
        if (error.code === 4001) {
            dispatch(error(error.message));
        }
    }
}

export const deployContract = async (dispatch) => {

    dispatch

    let currentAccount = await getCurrrentAccount();

    console.log(`Selected Account: ${currentAccount}`);

    //create the contract instance
    let contract = await new web3.eth.Contract(CONTRACT_ABI);

    console.log('Deploying....');

    let value = await contract.deploy({
        data: CONTRACT_BYTECODE,
        arguments: [432000, 50]
    })
        //Sending Transaction
        .send({
            from: currentAccount,
            gas: 1500000,
            gasPrice: '300000'
        })
        //Transaction was success 
        .on('transactionHash', txHash => {
            console.log(`Tx Hash: ${txHash}`);
        })

        //Error handling
        .on('error', error => {
            console.log(`An Error occured: ${error.message}`);
        });

    console.log(`Deployed Contract Address: ${value._address}`);
    return value._address;
}
