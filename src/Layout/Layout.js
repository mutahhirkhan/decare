import React, { Suspense, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import { useStore } from '../context/GlobalState';
import { setIsUserAccountSelected, metamaskEnabled, appLoaded } from '../store/actions/appStateActions';
import { signOut, authsuccessded } from '../store/actions/authActions';
import { setUserDetails } from '../store/actions/userActions';
import { enable, listenAccountChange, listenNetworkChange } from '../services/ethereum/ethService';
import { onAuthStateChanged } from '../services/firebase/authService';
import { getUserByEmail } from '../services/firebase/databaseService';

//components
import { NavigationBar } from '../components/NavigationBar/NavigationBar';
import { Home } from '../containers/Home/Home';
import { Campaigns } from '../containers/Campaigns/Campaigns'
import { CampaignExplorer } from '../containers/CampaignExplorer/CampaignExplorer'
import { Profile } from '../containers/Profile/Profile';
import { MyDonations } from '../containers/MyDonations/MyDonations';
import { CreateCampaign } from '../containers/CreateCampaign/CreateCampaign';
import { AlertsList } from '../components/AlertsList/AlertsList';
import { MyCampaigns } from '../containers/MyCampaigns/MyCampaigns';
import { SignIn } from '../components/SignIn/SignIn';
import { NoMetamaskMessage } from '../components/Messages/NoMetamaskMessage';
import { InvalidAccountMessage } from '../components/Messages/InvalidAccountMessage';
import { LoadingMessage } from '../components/Messages/LoadingMessage';
import { InvalidNetworkMessage } from '../components/Messages/InvalidNetworkMessage';

export const Layout = () => {
    const [{ appState, auth, user }, dispatch] = useStore();
    const history = useHistory();
    const ropstenNetworkId = 3;    //ropsten
    const goerliNetworkId = 5;    //goerli;
    const setupApp = async (dispatch) => {

        //check authentication state
        onAuthStateChanged(async (user) => {
            if (user) {
                //fetch user info
                const userInfo = await getUserByEmail(user.email);
                //set the user state
                dispatch(setUserDetails(userInfo));

                //dispatch successfull sign in
                dispatch(authsuccessded());

            }
            else {
                dispatch(signOut());
            }
        });
        //enable metamask
        const isEnabled = await enable(dispatch);
        if (isEnabled) {
            dispatch(metamaskEnabled());
        }
        
        dispatch(appLoaded());
    }

    const signOutHandler = () => {
        dispatch(signOut());
        dispatch(setUserDetails(null));
        history.push('/signin');
    }

    useEffect(() => {
        setupApp(dispatch);
        listenNetworkChange(dispatch);
    }, []);
    

    useEffect(() => {
        //listen account changed event
        listenAccountChange(user.address, dispatch);

        dispatch(setIsUserAccountSelected(appState.currentAccount === user.address));
    }, [user]);



    let routes = (
        <Switch>
            <Route path="/signin" exact component={SignIn} />
            <Route path="/campaigns" exact render={props => <Campaigns {...props} />} />
            <Route path="/campaign/:address" exact component={CampaignExplorer} />
            <Route path="/" render={props => <Home {...props} />} />
        </Switch>
    );

    if (auth.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/my_campaigns" exact component={MyCampaigns} />
                <Route path="/campaigns" exact render={props => <Campaigns {...props} />} />
                <Route path="/campaign/:address" exact component={CampaignExplorer} />
                <Route path="/my_donations" exact component={MyDonations} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/create_campaign" exact component={CreateCampaign} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/" render={props => <Home {...props} />} />
            </Switch>
        );
    }
    return (
        appState.isAppLoaded ?
            // appState.isMetamaskEnabled ?
            appState.isUserAccountSelected || !auth.isAuthenticated ?
                (
                    appState.currentNetwork == ropstenNetworkId || 
                    appState.currentNetwork == goerliNetworkId
                ) || !auth.isAuthenticated?
                    <React.Fragment>
                        {/* Navigation Bar */}
                        <NavigationBar />

                        {/* Alerts as notifications */}
                        <AlertsList />

                        {/* This will load the proper page according to the given route */}
                        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>

                    </React.Fragment>
                    : <InvalidNetworkMessage />
                : <InvalidAccountMessage address={user.address} signOutHandler={signOutHandler} />
            // : <NoMetamaskMessage />
            : <LoadingMessage />
    );
}