import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import * as dbService from '../../services/firebase/databaseService';
import * as ethService from '../../services/ethereum/ethService';
import { showError } from '../../store/actions/alertAction';
import { useStore } from '../../context/GlobalState';
import { Link } from 'react-router-dom';
import { TransactionList } from '../../components/TransactionList/TransactionList';

export const MyDonations = () => {
    const [{ user }, dispatch] = useStore();
    const [donations, setDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadDonations();
    }, [])

    const loadDonations = async () => {
        setIsLoading(true);

        try {
            let d = [];
            const data = await dbService.getDonations();
            for (const i in data) {
                if (data.hasOwnProperty(i) && data[i][user.address]) {

                    const element = data[i];
                    const hashes = Object.keys(element[user.address]);
                    const amounts = Object.values(element[user.address]);

                    const tx = hashes.map((h, i) => { return { txHash: h, amount: amounts[i] } });

                    d.push({
                        campaignTitle: (await ethService.getCampaign(i)).title,
                        campaignAddress: i,
                        transactions: tx,
                    })
                }
            }
            setDonations(d);
        }
        catch (e) {
            dispatch(showError(e.message));
        }
        setIsLoading(false);
    }

    return (
        <Container>
            <h1 className='text-center my-5' style={{ fontWeight: 'bold' }}>My Donations</h1>
            {
                (!isLoading && donations?.length === 0) &&
                <Row className='align-items-center justify-content-center my-3'>
                    <Col xs='auto'>You don't have any donations yet..!</Col>
                </Row>
            }
            {
                isLoading ?
                    <Row className='align-items-center justify-content-center my-3'>
                        <Col xs='auto'>
                            <Spinner className='text-center' animation="grow" variant="primary" role="status" />
                        </Col>
                    </Row>
                    : donations.map(d =>
                        <Card style={{ boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)' }} className='my-5 text-center'>
                            <Card.Header as="h5">
                                <Link to={`campaign${d.campaignAddress}`}>
                                    Campaign Name: {d.campaignTitle}
                                </Link>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <TransactionList transactions={d.transactions} onlyTransaction={true} />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>)
            }
        </Container>
    )

}