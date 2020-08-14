import { auth } from './config';

export const signUpUser = async (email, password) => {
    await auth.createUserWithEmailAndPassword(email, password);
}

export const signInUser = async (email, password) => {
    return (await auth.signInWithEmailAndPassword(email.toLowerCase(), password)).user;
}

export const signOutUser = () => {
    auth.signOut();
}

export const getCurrentUser = () => {
    return auth.currentUser;
}

export const onAuthStateChanged = (onChanged) => {
    auth.onAuthStateChanged(user => onChanged(user));
}