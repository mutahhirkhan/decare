import React from 'react'
import { Campaign } from '../Campaign/Campaign'
import classes from './CampaignList.module.css'

export const CampaignList = ({ campaigns }) => {

    return (
        <div>
            <h1 className={classes.Heading}>Campaigns</h1>
            {campaigns.map(c => <Campaign key={c.id} campaign={c} />)}
        </div>
    );
}