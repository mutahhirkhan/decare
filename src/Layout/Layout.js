import React from 'react'
import { CampaignExplorer } from '../containers/CampaignExplorer/CampaignExplorer'
import { Campaigns } from '../containers/Campaigns/Campaigns'
import { NavigationBar } from '../components/NavigationBar/NavigationBar';
import { Container } from 'react-bootstrap';
import { Profile } from '../containers/Profile/Profile';
import { MyDonations } from '../containers/MyDonations/MyDonations';
import { Home } from '../containers/Home/Home';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';



export const Layout = props => {
    return (
        <React.Fragment>
            <NavigationBar />
            props.children
            
        </React.Fragment>
    );
}