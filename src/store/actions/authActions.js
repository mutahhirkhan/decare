import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, SIGN_OUT } from '../actions/actionTypes';
import { showError } from '../actions/alertAction';
import * as authService from '../../services/firebase/authService';
import * as dbService from '../../services/firebase/databaseService';
import * as ethService from '../../services/ethereum/ethService';
import { setUserDetails } from './userActions';

export const authStarted = () => {
    return {
        type: AUTH_START,
    }
}

export const authsuccessded = () => {
    return {
        type: AUTH_SUCCESS,
    }
}

export const authFailed = () => {
    return {
        type: AUTH_FAIL
    }
}

export const signOut = () => {
    authService.signOutUser();
    return {
        type: SIGN_OUT
    };
}

export const authenticateAsync = async (_address, email, password, isSignup, dispatch) => {
    const address = ethService.toChecksumAddress(_address);
    try {
        dispatch(authStarted());
        if (isSignup) {
            await authService.signUpUser(email, password);
            await dbService.setUser(address, {
                name: '',
                email: email,
                organizationName: '',
                bio: '',
                address: address,
                imgUrl: '',
                campaigns: {}
            });
            const user = await dbService.getUserByEmail(email);
            dispatch(setUserDetails(user));
        }
        else {
            await authService.signInUser(email, password);
            const user = await dbService.getUserByEmail(email);
            dispatch(setUserDetails(user));
        }
        dispatch(authsuccessded());
        return true;
    }
    catch (e) {
        dispatch(authFailed());
        switch (e.code) {
            case 'auth/user-not-found':
                dispatch(showError("Invalid email address"));
                break;
            default:
                dispatch(showError(e.message));
                break;
        }
        return false;
    }
}