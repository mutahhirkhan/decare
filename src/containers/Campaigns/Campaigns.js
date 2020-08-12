import React, { useState, useEffect, useCallback } from 'react';
import { CampaignList } from '../../components/CampaignList/CampaignList';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import * as ethService from '../../services/ethereum/ethService';


export const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [count, setCount] = useState(0);

    const loadCampaigns = useCallback(async () => {

        //get campaign count
        let newCount = await ethService.getCampaignsCount();
        setCount(newCount);
        //load all campaigns
        ethService.getAllCampaigns(campaign => {

            //push new campaign
            setCampaigns(currentCampaigns => {
                setCampaigns([...currentCampaigns, campaign]);
            });

        });

    });

    useEffect(() => {
        loadCampaigns();
    }, []);

    return (
        <Container style={{ maxWidth: '1300px' }}>
            <Row>
                <Col>
                    <h1 className='text-center my-4' style={{ fontWeight: 'bold' }}>Campaigns</h1>
                </Col>
            </Row>
            {
                count != campaigns?.length &&
                <Row className='align-items-center justify-content-center my-3'>
                    <Col xs='auto'>
                        <Spinner className='text-center' animation="grow" variant="primary" role="status" />
                    </Col>
                </Row>
            }
            <Row>
                <Col>
                    {campaigns?.length === 0 ? <div>No Campaigns found...!</div>
                        : <CampaignList campaigns={campaigns} />
                    }
                </Col>
            </Row>
        </Container>
    );
}