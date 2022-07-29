import Web3 from "web3";
import { abi as CAMPAIGN_ABI } from '../../contract/Campaign.json';
import { abi as CAMPAIGN_FACTORY_ABI } from '../../contract/CampaignFactory.json';
import { setCurrentAccount, setCurrentNetwork, setIsUserAccountSelected } from '../../store/actions/appStateActions';
import { getUserByAddress, getCampaginFactoryAddress } from '../firebase/databaseService';

//infura end point
const infuraEndpoint = 'https://ropsten.infura.io/v3/d015a88ae875483c80e72a899d7eb8ba';

// var provider = 'http://127.0.0.1:7545';
var Contract = require('web3-eth-contract');
Contract.setProvider(Web3.givenProvider || infuraEndpoint);

//set up the campaign factory
let factoryAddress;
let factory;

let currentAccount;


//web3 singleton
let web3 = new Web3(Web3.givenProvider || infuraEndpoint);

//listen for metamask account change
export const listenAccountChange = (userAddress, dispatch) => {
    if (web3.givenProvider) {
        web3.givenProvider.on('accountsChanged', function (accounts) {
            currentAccount = web3.utils.toChecksumAddress(accounts[0]);
            dispatch(setCurrentAccount(currentAccount));
            dispatch(setIsUserAccountSelected(currentAccount === userAddress));
        });
    }
}

export const listenNetworkChange = (dispatch) => {
    if (web3.givenProvider) {
        web3.givenProvider.on('networkChanged', function (networkId) {
            dispatch(setCurrentNetwork(networkId));
        });
    }
}

export const enable = async (dispatch) => {
    //get campagin factory addresses from firebase
    let factoryAddresses = await getCampaginFactoryAddress();
    
    //get network id
    const networkId = await web3.eth.net.getId();

    //select factory address based on network id
    networkId === 3 ? factoryAddress = factoryAddresses.ropsten : factoryAddress = factoryAddresses.goerli;

    factory = new Contract(CAMPAIGN_FACTORY_ABI, factoryAddress);
    
    if (web3.givenProvider) {

        //get currnet account
        currentAccount = web3.utils.toChecksumAddress((await web3.eth.requestAccounts())[0]);
        dispatch(setCurrentAccount(currentAccount));

        dispatch(setCurrentNetwork(networkId));
        return true;
    }
    return false;
}

export const toChecksumAddress = (address) => web3.utils.toChecksumAddress(address);

export const toWei = (value) => web3.utils.toWei(value, 'ether');

export const createCampaign = async (title, description, amount, createTimestamp, closeTimestamp) => {
    await factory.methods.createCampaign(
        currentAccount,
        title,
        description,
        web3.utils.toWei(amount, 'ether'),
        createTimestamp,
        closeTimestamp
    ).send({ from: currentAccount });
    const address = await factory.methods.getLastDeployedContract().call();
    return address;
}

export const getCampaign = async (campaignAddress, userAddress) => {
    const campaign = new Contract(CAMPAIGN_ABI, campaignAddress);
    const summary = await campaign.methods.getSummary().call();
    const donorsCount = await campaign.methods.dononrsCount().call();
    let isDonor = false;

    if (userAddress) {
        isDonor = await campaign.methods.donors(userAddress).call() != 0;
    }

    let campaignSummary = {
        managerAddress: summary[0],
        title: summary[1],
        description: summary[2],
        amountInitialGoal: web3.utils.fromWei(summary[3], 'ether').toString(),
        amountCollected: web3.utils.fromWei(summary[4], 'ether').toString(),
        amountDelegated: web3.utils.fromWei(summary[5], 'ether').toString(),
        amountSpended: web3.utils.fromWei(summary[6], 'ether').toString(),
        fundRequestProcessTime: summary[7],
        createdAt: new Date(summary[8] * 1000),
        closedAt: new Date(summary[9] * 1000),
        donorsListLength: summary[10],
        fundRequestsCount: summary[11],
        isActive: summary[12],
        address: campaignAddress,
        donorsCount: donorsCount,
        isDonor: isDonor,
    }
    if (campaignSummary.isActive) {
        if (campaignSummary.amountInitialGoal < campaignSummary.amountCollected && campaignSummary.closedAt.getTime() < new Date().getTime())
            campaignSummary.status = 'Locked';
        else if (campaignSummary.amountInitialGoal < campaignSummary.amountCollected)
            campaignSummary.status = 'Goal Reached';
        else
            campaignSummary.status = 'Goal Pending';
    }
    else {
        campaignSummary.status = 'Closed';
    }
    return campaignSummary;
}

export const getCampaignsCount = async () => {
    let count = await factory.methods.getCampaignsCount().call();
    console.log("count",count);
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
    const tx = await campaign.methods.donate().send({ from: currentAccount, value: web3.utils.toWei(amount, 'ether').toString() });
    return tx;
}

export const withdrawDonation = async (address) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    await campaign.methods.withdrawDonation().send({ from: currentAccount });
}

export const getDonorsList = async (address, startIndex, endIndex, callback) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    let donors = [];
    for (let i = startIndex; i < endIndex; i++) {
        let donor = await campaign.methods.donorsList(i).call();
        if (donor.amount != 0) {
            const user = await getUserByAddress(donor.personAddress);
            donor.amount = web3.utils.fromWei(donor.amount, 'ether').toString();
            donor.username = user.name;
            callback(donor);
            donors.push(donor);
        }
    }
    return donors;
}

export const createFundRequest = async (address, description, amount, recipientAddresses, recipientAmount) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    const amounts = recipientAmount.map(i => web3.utils.toWei(i.toString(), 'ether'));
    await campaign.methods.createFundRequest(
        description,
        web3.utils.toWei(amount.toString(), 'ether').toString(),
        recipientAddresses,
        amounts
    ).send({ from: currentAccount });
}

export const closeFundRequest = async (address, index) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    await campaign.methods.closeFundRequest(index).send({ from: currentAccount });
}

export const getSingleFundRequest = async (address, index) => {
    const campaign = new Contract(CAMPAIGN_ABI, address);
    const req = await campaign.methods.getFundRequest(index).call();
    const request = {
        description: req[0],
        amount: web3.utils.fromWei(req[1], 'ether').toString(),
        recipientsCount: req[2],
        disapproversCount: req[3],
        createdAt: new Date(req[4] * 1000),
        isCompleted: req[5],
        isDisapprover: req[6],
        recipients: req[7].map((x, i) => {
            return { address: x, amount: web3.utils.fromWei(req[8][i], 'ether').toString() };
        }),
        isClosed: req[9],
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

export const deactivate = async (address) => {
    let campaign = new Contract(CAMPAIGN_ABI, address);
    await campaign.methods.deactivate().send({ from: currentAccount });
}