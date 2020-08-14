import React, { useState, useEffect } from 'react';
import { CampaignDetails } from '../../components/CampaignDetails/CampaignDetails';
import { FundRequestsList } from '../../components/FundRequestsList/FundRequestsList';
import { DonationList } from '../../components/DonationList/DonationList';
import { Container, Spinner, Row, Col, Tabs, Tab, Card } from 'react-bootstrap';
import * as ethService from '../../services/ethereum/ethService';
import * as dbService from '../../services/firebase/databaseService';
import { showError } from '../../store/actions/alertAction';
import { useStore } from '../../context/GlobalState';
import { CreateFundRequest } from '../../components/CreateFundRequest/CreateFundRequest';

export const CampaignExplorer = props => {
    const [{ user }, dispatch] = useStore();

    const [campaign, setCampaign] = useState(null);
    const [donations, setDonations] = useState([]);
    const [fundRequests, setFundRequests] = useState([]);

    const [loadingFundRequest, setLoadingFundRequest] = useState(false);
    const [loadingDonations, setLoadingDonations] = useState(false);

    const [loadingCampaign, setLoadingCampaign] = useState(true);

    const loadCampaignDetails = async () => {
        setLoadingCampaign(true);

        try {
            //load campaign data from blockchain
            let c = await ethService.getCampaign(props.match.params.address, user.address);
            c.manager = (await dbService.getUserByAddress(c.managerAddress)).name;
            setCampaign(c);
            console.log(c);
        }
        catch (e) {
            dispatch(showError(e.message));
        }

        setLoadingCampaign(false);
    }

    const loadDonations = async () => {
        if (!campaign)
            return;
        setLoadingDonations(true);
        try {
            setDonations([]);
            await ethService.getDonorsList(campaign.address, 1, campaign.donorsListLength, async (d) => {
                const tx = await dbService.getTransaction(campaign.address, d.personAddress);
                d.transactions = Object.keys(tx).map(t => {
                    return { txHash: t, amount: tx[t] }
                })
                setDonations(currDonations => {
                    return [...currDonations, d]
                });
            });
        }
        catch (e) {
            dispatch(showError(e.message));
        }
        setLoadingDonations(false);
    }

    const loadFundRequests = async () => {
        if (!campaign)
            return;
        setLoadingFundRequest(true);
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
        setLoadingFundRequest(false);
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
                                loadingDonations ? <Spinner className='text-center' animation="grow" variant="primary" role="status" />
                                    : donations.length === 0 ?
                                        <div>No Donations found....!</div>
                                        : <DonationList style={{ boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)' }} donations={donations} />
                            }
                        </Tab>

                        {/* Fund Requests */}
                        <Tab eventKey='requests' title='Fund Requests' style={{ marginTop: '10px' }}>
                            {
                                loadingFundRequest ? <Spinner className='text-center' animation="grow" variant="primary" role="status" />
                                    : fundRequests.length === 0 ? <div>No Fund Request found...!</div>
                                        : <FundRequestsList
                                            requests={fundRequests}
                                            loadCampaignDetails={loadCampaignDetails}
                                            campaign={campaign}
                                            isManager={user.address == campaign?.managerAddress} />
                            }
                        </Tab>

                        {/* Create Fund Requests */}
                        {
                            user.address == campaign?.managerAddress &&
                            < Tab eventKey='createRequests' title='Create Fund Requests' style={{ marginTop: '10px' }}>
                                <CreateFundRequest campaign={campaign} loadCampaignDetails={loadCampaignDetails} createRequest={createRequest} />
                            </Tab>
                        }
                    </Tabs>
                </Card.Body>
            </Card>

        </Container >
    );
}