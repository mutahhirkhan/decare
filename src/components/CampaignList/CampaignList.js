import React from 'react'
import { Campaign } from '../Campaign/Campaign'

export const CampaignList = ({ campaigns }) => {

    return (
        <div>
            {campaigns.map(c => <Campaign key={c.address} campaign={c} />)}
        </div>
    );
}