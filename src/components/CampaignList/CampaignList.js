import React from 'react'
import { Campaign } from '../Campaign/Campaign'

export const CampaignList = ({ campaigns }) => {

    return (
        <div>
            <h1 className='text-center my-4' style={{ fontWeight: 'bold' }}>Campaigns</h1>
            {campaigns.map(c => <Campaign key={c.id} campaign={c} />)}
        </div>
    );
}