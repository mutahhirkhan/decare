import { database } from './config';

const write = async (node, jsonData) => {
    await database.ref(node).set(jsonData);
}

const read = async (path) => {
    return (await database.ref(path).once('value')).val();
}

export const addUser = async (address, user) => {
    await write(`users/${address}`, user);
}

export const getUserByAddress = async (address) => {
    return read(`users/${address}`);
}

export const getUserByEmail = async (email) => {
    const user = (await database.ref('users').orderByChild('email').equalTo(email).once('value')).val();
    return user[[Object.keys(user)[0]]];
}