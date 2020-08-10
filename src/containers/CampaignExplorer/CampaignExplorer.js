import React, { useState, useEffect } from 'react';
import { CampaignDetails } from '../../components/CampaignDetails/CampaignDetails';
import { FundRequestsList } from '../../components/FundRequestsList/FundRequestsList';
import { TransactionList } from '../../components/TransactionList/TransactionList';
import { Container, Spinner, Row, Col, Tabs, Tab, Card } from 'react-bootstrap';
import * as ethService from '../../services/ethereum/ethService';
import { showError } from '../../store/actions/alertAction';
import { useStore } from '../../context/GlobalState';
import { CreateFundRequest } from '../../components/CreateFundRequest/CreateFundRequest';

export const CampaignExplorer = props => {
    const [{ user }, dispatch] = useStore();

    const [campaign, setCampaign] = useState(null);
    const [donations, setDonations] = useState([]);
    const [fundRequests, setFundRequests] = useState([]);

    const [loadingCampaign, setLoadingCampaign] = useState(true);

    const loadCampaignDetails = async () => {
        setLoadingCampaign(true);

        try {
            //load campaign data from blockchain
            let c = await ethService.getCampaign(props.match.params.address);
            setCampaign(c);
        }
        catch (e) {
            dispatch(showError(e.message));
        }

        setLoadingCampaign(false);
    }

    const loadDonations = async () => {
        if (!campaign)
            return;
        try {
            setDonations([]);
            await ethService.getDonorsList(campaign.address, 1, campaign.donorsCount, d => {
                setDonations(currDonations => {
                    return [...currDonations, d]
                });
            });
        }
        catch (e) {
            dispatch(showError(e.message));
        }
    }

    const loadFundRequests = async () => {
        if (!campaign)
            return;
        try {
            setFundRequests([]);
            await ethService.getFundRequests(campaign.address, 0, campaign.fundRequestsCount, r => {
                setFundRequests(currRequest => {
                    return [...currRequest, r]
                });
            });
        }
        catch (e) {
            dispatch(showError(e.message));
        }
    }

    const createRequest = async (description, amount, addresses, amounts) => {
        //check if campaigns has enough funds to create this request
        if (amount <= campaign.amountCollected - campaign.amountSpended - campaign.amountDelegated) {

            await ethService.createFundRequest(campaign.address, description, amount, addresses, amounts);
            await loadFundRequests();
        } else {
            dispatch(showError("Campaign don't have enough funds to create this request"));
        }
    }

    useEffect(() => {
        loadCampaignDetails();
    }, []);

    useEffect(() => {
        loadDonations();
        loadFundRequests();
    }, [campaign]);


    return (
        <Container className='mb-5'>

            <h2 style={{ fontWeight: 'bold' }} className='text-center my-4'>Campaign Details.</h2>

            {
                loadingCampaign || !campaign ?
                    <Row className='align-items-center justify-content-center my-3'>
                        <Col md='auto'>
                            <Spinner className='text-center' animation="grow" variant="primary" role="status" />
                        </Col>
                    </Row>
                    : <CampaignDetails style={{ boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)' }} loadCampaignDetails={loadCampaignDetails} campaign={campaign} />
            }

            <h1 style={{ fontWeight: 'bold' }} className='text-center mt-5 mb-3'>Donations</h1>

            <Card style={{ boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)' }}>
                <Card.Body>

                    <Tabs defaultActiveKey='donations' >
                        {/* Donations */}
                        <Tab eventKey="donations" title='Donations' style={{ marginTop: '10px' }}>
                            {
                                !donations ? <div>No Donations found....!</div>
                                    : donations.length > 0 ?
                                        <TransactionList style={{ boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)' }} transactions={donations} />
                                        : <Spinner className='text-center' animation="grow" variant="primary" role="status" />
                            }
                        </Tab>

                        {/* Fund Requests */}
                        <Tab eventKey='requests' title='Fund Requests' style={{marginTop: '10px'}}>
                            {
                                !fundRequests ? <div>No Fund Request found...!</div>
                                    : fundRequests.length > 0 ?
                                        <FundRequestsList
                                            requests={fundRequests}
                                            address={campaign.address}
                                            loadCampaignDetails={loadCampaignDetails}
                                            donorsCount={campaign.donorsCount}
                                            isManager={user.address == campaign?.manager} />
                                        : <Spinner className='text-center' animation="grow" variant="primary" role="status" />
                            }
                        </Tab>

                        {/* Create Fund Requests */}
                        {
                            user.address == campaign?.manager &&
                            < Tab eventKey='createRequests' title='Create Fund Requests' style={{ marginTop: '10px' }}>
                                <CreateFundRequest loadCampaignDetails={loadCampaignDetails} createRequest={createRequest} />
                            </Tab>
                        }
                    </Tabs>
                </Card.Body>
            </Card>

        </Container >
    );
}