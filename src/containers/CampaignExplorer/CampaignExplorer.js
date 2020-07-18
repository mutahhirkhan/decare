import React from 'react';
import { CampaignDetails } from '../../components/CampaignDetails/CampaignDetails';
import { TransactionList } from '../../components/TransactionList/TransactionList';
import { Container } from 'react-bootstrap';

export const CampaignExplorer = props => {
    return (
        <Container className='mx-auto'>

            <h1 style={{ fontWeight: 'bold' }} className='text-center my-3'>Campaign Details. ID: {props.match.params.id}</h1>

            <CampaignDetails style={{ boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)' }} campaign={
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

            <h1 style={{ fontWeight: 'bold' }} className='text-center mt-5 mb-3'>Donations</h1>

            <TransactionList style={{ boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)' }} transactions={[
                { username: 'Mark Brooks', txHash: '0xASHFECKFOEMFAOFASLKFNSDJSDLJFNJJDSFKDSSDKJFN', createdDate: '11/05/2020', amount: '2 ETH', status: 'Success' },
                { username: 'Henry Will', txHash: '0xASHFECKFOEMFAOFASLKFNSDJSDLJFNJJDSFKDSSDKJFN', createdDate: '20/05/2020', amount: '3 ETH', status: 'Success' },
                { username: 'John Brad', txHash: '0xASHFECKFOEMFAOFASLKFNSDJSDLJFNJJDSFKDSSDKJFN', createdDate: '14/06/2020', amount: '5 ETH', status: 'Success' },
                { username: 'Fred Paul', txHash: '0xASHFECKFOEMFAOFASLKFNSDJSDLJFNJJDSFKDSSDKJFN', createdDate: '01/07/2020', amount: '4 ETH', status: 'Failed' },
                { username: 'Josh Tod', txHash: '0xASHFECKFOEMFAOFASLKFNSDJSDLJFNJJDSFKDSSDKJFN', createdDate: '13/07/2020', amount: '1 ETH', status: 'Success' }
            ]} />
        </Container>
    );
}