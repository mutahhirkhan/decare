import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import * as dbService from '../../services/firebase/databaseService';
import * as ethService from '../../services/ethereum/ethService';
import { showError } from '../../store/actions/alertAction';
import { useStore } from '../../context/GlobalState';
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
            console.log('donations', data);
            for (const i in data) {
                if (data.hasOwnProperty(i) && data[i][user.address]) {

                    const element = data[i];
                    const hashes = Object.keys(element[user.address]);
                    const amounts = Object.values(element[user.address]);

                    const tx = hashes.map((h, i) => { return { txHash: h, amount: amounts[i] } });

                    d.push({
                        campaignTitle: (await ethService.getCampaign(i)).title,
                        transactions: tx,
                        donations: [{
                            transactions: [{
                                transactions: tx
                            }]
                        }]
                    })
                }
            }
            console.log('transactions', d);
            setDonations(d);
        }
        catch (e) {
            dispatch(showError(e.message));
        }
        setIsLoading(false);
    }

    return (
        <Container>
            <h1 className='text-center my-5' style={{ fontWeight: 'bold' }}> Donations</h1>
            {
                donations.map(d =>
                    <Card style={{ boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)' }} className='my-5 text-center'>
                        <Card.Header as="h5">
                            Campaign Name: {d.campaignTitle}
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