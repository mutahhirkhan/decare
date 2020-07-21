import React, { Suspense } from 'react'
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


export const Layout = props => {

    let routes = (
        <Switch>
            <Route path="/campaigns" exact render={props => <Campaigns {...props} />} />
            <Route path="/my_campaigns" exact component={MyCampaigns} />
            <Route path="/campaign:id" exact component={CampaignExplorer} />
            <Route path="/my_donations" exact component={MyDonations} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/create_campaign" exact component={CreateCampaign} />
            <Route path="/" render={props => <Home {...props} />} />
        </Switch>
    )

    return (
        <React.Fragment>

            {/* Navigation Bar */}
            <NavigationBar />

            {/* Alerts as notifications */}
            <AlertsList />

            {/* This will load the proper page according to the given route */}
            <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>

        </React.Fragment>
    );
}