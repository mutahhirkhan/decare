import React from 'react';
import { TransactionList } from '../../components/TransactionList/TransactionList'
import { Container, Card, Row, Col } from 'react-bootstrap';


export const MyDonations = () => {
    return (
        <Container>
            <h1 className='text-center my-5' style={{ fontWeight: 'bold' }}> Donations</h1>
            {
                [
                    {
                        campaign: {
                            id: 1,
                            title: "Lorem Dolor Sit Amet",
                            description: "Aliquam erat volutpat. In lacinia velit ut massa porta elementum. Integer ornare, augue ut malesuada viverra, leo nisl pretium metus, vel ullamcorper nunc lorem a nisi. Duis eu sapien quis mauris convallis finibus vel et dui. Proin vel lacinia risus, iaculis mollis erat. Phasellus tincidunt dui elit, sed fringilla est maximus eu. Curabitur ut tempus mauris. Suspendisse potenti.",
                            createdBy: "DeCare NGO",
                            startDate: new Date().toDateString(),
                            endDate: new Date().toDateString(),
                            status: 'Open',
                            goalAmount: '20 ETH',
                            collectedAmount: '15 ETH'
                        },
                        transactions: [
                            {
                                username: 'Mark Brooks',
                                txHash: '0xASHFECKFOEMFAOFASLKFNSDJSDLJFNJJDSFKDSSDKJFN',
                                createdDate: '11/05/2020',
                                amount: '2 ETH',
                                status: 'Success'
                            },
                            {
                                username: 'Mark Brooks',
                                txHash: '0xASHFECKFOEMFAOFASLKFNSDJSDLJFNJJDSFKDSSDKJFN',
                                createdDate: '11/05/2020',
                                amount: '2 ETH',
                                status: 'Success'
                            },
                            {
                                username: 'Mark Brooks',
                                txHash: '0xASHFECKFOEMFAOFASLKFNSDJSDLJFNJJDSFKDSSDKJFN',
                                createdDate: '11/05/2020',
                                amount: '2 ETH',
                                status: 'Success'
                            }
                        ]
                    },
                    {
                        campaign: {
                            id: 1,
                            title: "Lorem Dolor Sit Amet",
                            description: "Aliquam erat volutpat. In lacinia velit ut massa porta elementum. Integer ornare, augue ut malesuada viverra, leo nisl pretium metus, vel ullamcorper nunc lorem a nisi. Duis eu sapien quis mauris convallis finibus vel et dui. Proin vel lacinia risus, iaculis mollis erat. Phasellus tincidunt dui elit, sed fringilla est maximus eu. Curabitur ut tempus mauris. Suspendisse potenti.",
                            createdBy: "DeCare NGO",
                            startDate: new Date().toDateString(),
                            endDate: new Date().toDateString(),
                            status: 'Open',
                            goalAmount: '20 ETH',
                            collectedAmount: '15 ETH'
                        },
                        transactions: [{
                            username: 'Mark Brooks',
                            txHash: '0xASHFECKFOEMFAOFASLKFNSDJSDLJFNJJDSFKDSSDKJFN',
                            createdDate: '11/05/2020',
                            amount: '2 ETH',
                            status: 'Success'
                        }]
                    },
                    {
                        campaign: {
                            id: 1,
                            title: "Lorem Dolor Sit Amet",
                            description: "Aliquam erat volutpat. In lacinia velit ut massa porta elementum. Integer ornare, augue ut malesuada viverra, leo nisl pretium metus, vel ullamcorper nunc lorem a nisi. Duis eu sapien quis mauris convallis finibus vel et dui. Proin vel lacinia risus, iaculis mollis erat. Phasellus tincidunt dui elit, sed fringilla est maximus eu. Curabitur ut tempus mauris. Suspendisse potenti.",
                            createdBy: "DeCare NGO",
                            startDate: new Date().toDateString(),
                            endDate: new Date().toDateString(),
                            status: 'Open',
                            goalAmount: '20 ETH',
                            collectedAmount: '15 ETH'
                        },
                        transactions: [{
                            username: 'Mark Brooks',
                            txHash: '0xASHFECKFOEMFAOFASLKFNSDJSDLJFNJJDSFKDSSDKJFN',
                            createdDate: '11/05/2020',
                            amount: '2 ETH',
                            status: 'Success'
                        }]
                    }
                ].map(d =>
                    <Card style={{ boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)' }} className='my-5 text-center'>
                        <Card.Header as="h5">
                            Campaign Name: {d.campaign.title}
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <TransactionList transactions={d.transactions} />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>)
            }
        </Container>
    )

}