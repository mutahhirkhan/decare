import { database } from './config';

const write = async (node, jsonData) => {
    await database.ref(node).set(jsonData);
}

const read = async (path) => {
    return (await database.ref(path).once('value')).val();
}

//-------------------------------PUBLIC METHODS---------------------------------
export const setUser = async (address, user) => {
    await write(`users/${address}`, user);
}

export const addUserCampaign = async (address, campaign) => {
    const key = await database.ref(`users/${address}/campaigns`).push(campaign).key;
    return key;
}

export const getUserByAddress = async (address) => {
    const user = await read(`users/${address}`);
    return user;
}

export const getUserByEmail = async (email) => {
    const user = (await database.ref('users').orderByChild('email').equalTo(email).once('value')).val();
    return user[[Object.keys(user)[0]]];
}

export const addDonation = async (campaignAddress, userAddress, txHash, amount) => {
    await database.ref(`donations/${campaignAddress}/${userAddress}/`).child(txHash).set(amount);
}

export const deleteDonation = async (campaignAddress, userAddress) => {
    await database.ref(`donations/${campaignAddress}/${userAddress}/`).remove();
}

export const getDonations = async () => {
    return await read('donations');
}

export const getTransaction = async (campaignAddress, userAddress) => {
    return await read(`donations/${campaignAddress}/${userAddress}`);
}

export const getUserDonations = async (userAddress) => {
    return (await database.ref('donations').orderByChild(`${userAddress}`).once('value')).val();
}

//donations structure
// const donations = {
//     ['campaign address']: {
//         ['user address']: {
//             ['transaction hash']: 'amount'
//         }
//     }
// }