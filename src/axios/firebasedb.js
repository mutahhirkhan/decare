import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://de-care-11445.firebaseio.com/'
});

export default instance;