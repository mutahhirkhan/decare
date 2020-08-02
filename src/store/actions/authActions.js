import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, SIGN_OUT } from '../actions/actionTypes';
import { showError } from '../actions/alertAction';
import * as authService from '../../firebase/authService'
import * as dbService from '../../firebase/databaseService'
import { setUserDetails } from './userActions';

export const authStart = () => {
    return {
        type: AUTH_START,
    }
}

export const authSuccess = () => {
    return {
        type: AUTH_SUCCESS,
    }
}

export const authFail = () => {
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

export const authenticateAsync = async (email, password, isSignup, dispatch) => {
    try {
        if (isSignup) {
            await authService.signUpUser(email, password);
            await dbService.addUser('0x123', {
                email: email,
                name: '',
                organizationName: '',
                bio: '',
                address: '0x123',
                imgUrl: ''
            });
            const user = await dbService.getUserByEmail(email);
            dispatch(setUserDetails(user));
        }
        else {
            await authService.signInUser(email, password);
            const user = await dbService.getUserByEmail(email);
            dispatch(setUserDetails(user));
        }
        return true;
    }
    catch (e) {
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