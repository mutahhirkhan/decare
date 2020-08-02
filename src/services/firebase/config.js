import firebase from 'firebase';

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: "AIzaSyC3LNbwxHFGGPl5jKXG3CjBVBrER350fR8",
    authDomain: "de-care-11445.firebaseapp.com",
    databaseURL: "https://de-care-11445.firebaseio.com",
    projectId: "de-care-11445",
    storageBucket: "de-care-11445.appspot.com",
    messagingSenderId: "1080234101368",
    appId: "1:1080234101368:web:83946f7ea4a35d12077b8d",
    measurementId: "G-KJ4Z9S3NFC"
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();