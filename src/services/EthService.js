import Web3 from "web3";

import { CONTRACT_ABI, CONTRACT_BYTECODE } from '../contract/DonationCampaignContract'

//web3 singleton
let web3 = new Web3(Web3.givenProvider);

export const enable = () => {
    window.ethereum.enable();
}

const getCurrrentAccount = async () => {
    await Web3.givenProvider.enable();

    //Get accounts
    const account = await web3.eth.getAccounts();
    return account[0].toString();
}

export const deployContract = async () => {

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

export const getDonatedAmount = async (contractAddress, donorAddress) => {
    let contract = await new web3.eth.Contract(CONTRACT_ABI, contractAddress);
    return await contract.methods.donors(donorAddress).call();
}

export const getBeneficiaryAmount = async (contractAddress, beneficiaryAddress) => {
    let contract = await new web3.eth.Contract(CONTRACT_ABI, contractAddress);
    return await contract.methods.beneficiaries(beneficiaryAddress).call();
}

export const addBeneficiary = async (contractAddress, beneficiaryAddress, amount) => {
    let error = null;
    let contract = await new web3.eth.Contract(CONTRACT_ABI, contractAddress);
    await contract.methods.addBeneficiary(beneficiaryAddress, amount).call()
        .on('error', e => {
            console.error(e.message);
            error = e.message;
        });
    return error;
}

export const donate = async (contractAddress, amount) => {
    let account = await getCurrrentAccount();
    console.log(account);
    let contract = await new web3.eth.Contract(CONTRACT_ABI, contractAddress);
    await contract.methods.donate().send({
        from: account,
        value: amount
    });
    console.log(`${amount} ETH donated.`);
}

export const withDrawDonation = async (contractAddress) => {
    let contract = await new web3.eth.Contract(CONTRACT_ABI, contractAddress);
    return await contract.methods.withDrawDonation().call();
}