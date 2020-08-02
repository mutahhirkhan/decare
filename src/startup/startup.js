import { metamaskEnabled, appLoaded } from '../store/actions/appStateActions';
import { setUserDetails } from '../store/actions/userActions';
import { signOut, authsuccessded } from '../store/actions/authActions';
import { onAuthStateChanged } from '../services/firebase/authService';
import { getUserByEmail } from '../services/firebase/databaseService';
import { enable, listenAccountChange } from '../services/ethereum/ethService';


export const setupApp = async (dispatch) => {

    //setup metamask
    const isEnabled = await enable(dispatch);
    if (isEnabled) {
        dispatch(metamaskEnabled());
    }

    //check authentication state
    onAuthStateChanged(async (user) => {
        if (user) {
            //fetch user info
            const userInfo = await getUserByEmail(user.email);

            //set the state
            dispatch(setUserDetails(userInfo));

            //dispatch successfull sign in
            dispatch(authsuccessded());
        }
        else {
            dispatch(signOut());
        }
        dispatch(appLoaded());
    });

    //listen account changed events
    listenAccountChange(dispatch);
}