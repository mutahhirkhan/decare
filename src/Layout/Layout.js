import React from 'react'
import { CampaignExplorer } from '../containers/CampaignExplorer/CampaignExplorer'
import { Campaigns } from '../containers/Campaigns/Campaigns'
import { NavigationBar } from '../components/NavigationBar/NavigationBar';


export const Layout = () => {
    return (
        <React.Fragment>
            <NavigationBar/>
            <CampaignExplorer />
        </React.Fragment>
    );
}