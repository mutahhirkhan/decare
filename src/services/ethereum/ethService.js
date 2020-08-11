import Web3 from "web3";
import { abi as CAMPAIGN_ABI } from '../../contract/Campaign.json';
import { abi as CAMPAIGN_FACTORY_ABI } from '../../contract/CampaignFactory.json';
import { LOCAL_CAMAPAIGN_FACTORY_ADDRESS, ROPSTEN_CAMAPAIGN_FACTORY_ADDRESS } from '../../contract/CAMPAIGN_FACTORY_ADDRESS';
import { setCurrentAccount } from '../../store/actions/appStateActions';
import { getUserByAddress } from '../firebase/databaseService';

// var provider = 'http://127.0.0.1:7545';
var Contract = require('web3-eth-contract');
Contract.setProvider(Web3.givenProvider);

//set up the campaign factory
var factoryAddress = LOCAL_CAMAPAIGN_FACTORY_ADDRESS;
let factory = new Contract(CAMPAIGN_FACTORY_ABI, factoryAddress);

let currentAccount;

//web3 singleton
let web3 = new Web3(Web3.givenProvider);

export const toChecksumAddress = (address) => {
    return web3.utils.toChecksumAddress(address);
}

//listen for metamask account change
export const listenAccountChange = (dispatch) => {
    window.ethereum.on('accountsChanged', function (accounts) {
        currentAccount = accounts[0];
        dispatch(setCurrentAccount(accounts[0]));
    });
}

export const enable = async (dispatch) => {
    if (web3.givenProvider) {
        window.ethereum.enable();
        currentAccount = await getCurrrentAccount();
        dispatch(setCurrentAccount(currentAccount));

        return true;
    }
    return false;
}

const getCurrrentAccount = async () => {
    await Web3.givenProvider.enable();

    //Get accounts
    const account = await web3.eth.getAccounts();
    return account[0].toString();
}

export const createCampaign = async (title, description, amount, createTimestamp, closeTimestamp) => {
    await factory.methods.createCampaign(
        currentAccount,
        title,
        description,
        amount,
        createTimestamp,
        closeTimestamp
    ).send({ from: currentAccount });
    const address = await factory.methods.getLastDeployedContract().call();
    return address;
}

export const getCampaign = async (address) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    let summary = await campaign.methods.getSummary().call();
    return {
        manager: summary[0],
        title: summary[1],
        description: summary[2],
        amountInitialGoal: summary[3],
        amountCollected: summary[4],
        amountDelegated: summary[5],
        amountSpended: summary[6],
        fundRequestProcessTime: summary[7],
        createdAt: new Date(summary[8] * 1000),
        closedAt: new Date(summary[9] * 1000),
        donorsCount: summary[10],
        fundRequestsCount: summary[11],
        isActive: summary[12],
        address: address,
    }
}

export const getCampaignsCount = async () => {
    let count = await factory.methods.getCampaignsCount().call();
    return count;
}

export const getAllCampaigns = async (callback) => {
    let count = await factory.methods.getCampaignsCount().call();
    const campaignAddresses = await factory.methods.getDeployedCampaigns().call();
    let campaigns = [];
    for (let i = 0; i < count; i++) {
        let campaign = await getCampaign(campaignAddresses[i]);
        if (callback) {
            callback(campaign);
        }
        campaigns.push(campaign);
    }
    return campaigns;
}

export const donate = async (address, amount) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    await campaign.methods.donate().send({ from: currentAccount, value: amount });
}

export const withdrawDonation = async (address) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    let amount = await campaign.methods.withdrawDonation().send({ from: currentAccount });
    return amount;
}

export const getDonorsList = async (address, startIndex, endIndex, callback) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    let donors = [];
    for (let i = startIndex; i < endIndex; i++) {
        let donor = await campaign.methods.donorsList(i).call();
        const user = await getUserByAddress(donor.personAddress);
        donor.username = user.name;
        callback(donor);
        donors.push(donor);
    }
    return donors;
}

export const createFundRequest = async (address, description, amount, recipientAddresses, recipientAmount) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    await campaign.methods.createFundRequest(description, amount, recipientAddresses, recipientAmount).send({ from: currentAccount });
}

export const getSingleFundRequest = async (address, index) => {
    const campaign = new Contract(CAMPAIGN_ABI, address);
    const req = await campaign.methods.getFundRequest(index).call();
    const request = {
        description: req[0],
        amount: req[1],
        recipientsCount: req[2],
        disapproversCount: req[3],
        createdAt: new Date(req[4] * 1000),
        isCompleted: req[5],
        isDisapprover: req[6],
        recipients: req[7].map((x, i) => {
            return { address: x, amount: req[8][i] };
        }),
        index: index,
    }
    return request;
}

export const getFundRequests = async (address, startIndex, endIndex, callback) => {
    const campaign = new Contract(CAMPAIGN_ABI, address);
    let requests = [];
    for (let i = startIndex; i < endIndex; i++) {
        const request = await getSingleFundRequest(address, i);
        callback(request);
        requests.push(request);
    }
    return requests;
}

export const approveFundRequest = async (address, fundRequestIndex) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    await campaign.methods.approveFundRequest(fundRequestIndex).send({ from: currentAccount });
}

export const disapproveFundRequest = async (address, fundRequestIndex) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    await campaign.methods.disapproveFundRequest(fundRequestIndex).send({ from: currentAccount });
}

export const processFundRequest = async (address, fundRequestIndex) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    await campaign.methods.processFundRequest(fundRequestIndex).send({ from: currentAccount });
}

export const getFundRequestProcessTime = async (address) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    const time = await campaign.methods.fundRequestProcessTime().call();
    return time;
}

export const deactivate = (address) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    campaign.methods.deactivate().call();
}