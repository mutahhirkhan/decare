import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyC3LNbwxHFGGPl5jKXG3CjBVBrER350fR8'
});

export default instance;