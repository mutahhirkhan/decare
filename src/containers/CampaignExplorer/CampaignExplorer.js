import React from 'react';
import { CampaignDetails } from '../../components/CampaignDetails/CampaignDetails';

export const CampaignExplorer = () => {
    return (
        <CampaignDetails campaign={
            {
                id: 1,
                title: "Lorem Dolor Sit Amet",
                description: "Aliquam erat volutpat. In lacinia velit ut massa porta elementum. Integer ornare, augue ut malesuada viverra, leo nisl pretium metus, vel ullamcorper nunc lorem a nisi. Duis eu sapien quis mauris convallis finibus vel et dui. Proin vel lacinia risus, iaculis mollis erat. Phasellus tincidunt dui elit, sed fringilla est maximus eu. Curabitur ut tempus mauris. Suspendisse potenti.",
                createdBy: "DeCare NGO",
                startDate: new Date().toDateString(),
                endDate: new Date().toDateString(),
                status: 'Open',
                goalAmount: '20 ETH',
                collectedAmount: '15 ETH'
            }

        } />
    );
}