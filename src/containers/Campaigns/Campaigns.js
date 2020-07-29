import React, { useState, useEffect, useCallback } from 'react';
import { CampaignList } from '../../components/CampaignList/CampaignList';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import * as ethService from '../../services/EthService';
import { useStore } from '../../context/GlobalState';


export const Campaigns = () => {
    // const [{ campaigns }, dispatch] = useStore();
    const [campaigns, setCampaigns] = useState([]);
    const [count, setCount] = useState(0);

    const loadCampaigns = useCallback(async () => {
        await ethService.enable();

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
        console.log('loading');

        loadCampaigns();
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className='text-center my-4' style={{ fontWeight: 'bold' }}>Campaigns</h1>
                </Col>
            </Row>
            {
                count != campaigns?.length &&
                <Row className='align-items-center justify-content-center my-3'>
                    <Col md='auto'>
                        <Spinner className='text-center' animation="border" variant="primary" role="status" />
                    </Col>
                </Row>
            }
            <Row>
                <Col>
                    <CampaignList campaigns={campaigns} />
                </Col>
            </Row>
        </Container>
    );
}