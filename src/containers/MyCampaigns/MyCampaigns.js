import React, { useState, useEffect, useCallback } from 'react';
import { CampaignList } from '../../components/CampaignList/CampaignList';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import * as ethService from '../../services/ethereum/ethService';
import { useStore } from '../../context/GlobalState';
import { showError } from '../../store/actions/alertAction';


export const MyCampaigns = () => {
    const [{ user }, dispatch] = useStore();
    const [campaigns, setCampaigns] = useState([]);
    const [count, setCount] = useState(0);

    const loadCampaigns = useCallback(async () => {
        try {
            if (user.campaigns) {
                const campaignAddresses = Object.values(user.campaigns);
                setCount(campaignAddresses.length);

                for (let i = 0; i < campaignAddresses.length; i++) {
                    const address = campaignAddresses[i];

                    //load campaign
                    const c = await ethService.getCampaign(address);

                    setCampaigns(currCampaigs => {
                        return [...currCampaigs, c]
                    });
                }
            }
        }
        catch (e) {
            dispatch(showError(e.message));
        }


    });

    useEffect(() => {
        loadCampaigns();
    }, []);

    return (
        <Container style={{ maxWidth: '1300px' }}>
            <Row>
                <Col>
                    <h1 className='text-center my-4' style={{ fontWeight: 'bold' }}>My Campaigns</h1>
                </Col>
            </Row>
            {
                count === 0 ? "You don't have any campaigns." :
                    count != campaigns?.length &&
                    <Row className='align-items-center justify-content-center my-3'>
                        <Col xs='auto'>
                            <Spinner className='text-center' animation="grow" variant="primary" role="status" />
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