import React, { Suspense, useEffect } from 'react'
import { NavigationBar } from '../components/NavigationBar/NavigationBar';
import { Home } from '../containers/Home/Home';
import { Campaigns } from '../containers/Campaigns/Campaigns'
import { CampaignExplorer } from '../containers/CampaignExplorer/CampaignExplorer'
import { Profile } from '../containers/Profile/Profile';
import { MyDonations } from '../containers/MyDonations/MyDonations';
import { Route, Switch } from 'react-router-dom';
import { CreateCampaign } from '../containers/CreateCampaign/CreateCampaign';
import { AlertsList } from '../components/AlertsList/AlertsList';
import { MyCampaigns } from '../containers/MyCampaigns/MyCampaigns';
import { Footer } from '../components/Footer/Footer';
import { SignIn } from '../components/SignIn/SignIn';
import { NoMetamaskMessage } from '../components/NoMetamaskMessage/NoMetamaskMessage';
import { useStore } from '../context/GlobalState';
import { setupApp } from '../startup/startup';

export const Layout = props => {
    const [{ startupState }, dispatch] = useStore();
    useEffect(() => {
        setupApp(dispatch);
    }, []);

    let routes = (
        <Switch>
            <Route path="/campaigns" exact render={props => <Campaigns {...props} />} />
            <Route path="/my_campaigns" exact component={MyCampaigns} />
            <Route path="/campaign:address" exact component={CampaignExplorer} />
            <Route path="/my_donations" exact component={MyDonations} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/create_campaign" exact component={CreateCampaign} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/" render={props => <Home {...props} />} />
        </Switch>
    )

    return (
        startupState.isAppLoaded ?
            startupState.isMetamaskEnabled ?
                <React.Fragment>
                    {/* Navigation Bar */}
                    <NavigationBar />

                    {/* Alerts as notifications */}
                    <AlertsList />

                    {/* This will load the proper page according to the given route */}
                    <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>

                    <Footer />
                </React.Fragment> : <NoMetamaskMessage />
            : <div>Wait a moment.......</div>
    );
}