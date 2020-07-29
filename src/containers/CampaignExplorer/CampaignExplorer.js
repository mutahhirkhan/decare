import React, { useState, useEffect } from 'react';
import { CampaignDetails } from '../../components/CampaignDetails/CampaignDetails';
import { TransactionList } from '../../components/TransactionList/TransactionList';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import * as ethService from '../../services/EthService';

export const CampaignExplorer = props => {
    const [campaign, setCampaign] = useState({});
    const [loading, setLoading] = useState(true);

    const loadCampaign = async () => {
        let c = await ethService.getCampaign(props.match.params.address);
        setLoading(false);
        setCampaign(c);
    }

    useEffect(() => {
        loadCampaign();
    }, [])

    return (
        <Container className='mx-auto'>

            <h1 style={{ fontWeight: 'bold' }} className='text-center my-3'>Campaign Details.</h1>

            {
                loading ?
                    <Row className='align-items-center justify-content-center my-3'>
                        <Col md='auto'>
                            <Spinner className='text-center' animation="border" variant="primary" role="status" />
                        </Col>
                    </Row>
                    : <CampaignDetails style={{ boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)' }} campaign={campaign} />
            }

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