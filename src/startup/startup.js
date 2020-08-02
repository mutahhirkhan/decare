import { enable } from '../services/EthService';
import { metamaskEnabled, appLoaded } from '../store/actions/startupActions';
import { setUserDetails } from '../store/actions/userActions';
import { signOut, authSuccess } from '../store/actions/authActions';
import { onAuthStateChanged } from '../firebase/authService';
import { getUserByEmail } from '../firebase/databaseService';



export const setupApp = async (dispatch) => {
    //setup metamask
    const isEnabled = await enable();
    if (isEnabled) {
        dispatch(metamaskEnabled());
    }

    //check authentication state
    onAuthStateChanged(async (user) => {
        if (user) {
            //fetch user info
            const userInfo = await getUserByEmail(user.email);
            dispatch(setUserDetails(userInfo));
            dispatch(authSuccess());
        }
        else {
            dispatch(signOut());
        }
        dispatch(appLoaded());
    });
}