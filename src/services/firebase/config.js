import firebase from 'firebase';
import 'firebase/auth';     
import 'firebase/storage';
import 'firebase/database'; 
import 'firebase/firestore';

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: "AIzaSyB8cMdUj1VTodhe85kwwJ_g3jMJyHa_e6k",
    authDomain: "fypdecare.firebaseapp.com",
    projectId: "fypdecare",
    storageBucket: "fypdecare.appspot.com",
    messagingSenderId: "199245709655",
    appId: "1:199245709655:web:e1b321a748ede6c535fe12",
    measurementId: "G-WP7GCMCDLT"
  };

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();