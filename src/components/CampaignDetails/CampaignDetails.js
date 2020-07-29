import React, { useState } from 'react'
import classes from './CampaignDetails.module.css'
import { FaCalendarAlt, FaUsers, FaExclamationCircle } from 'react-icons/fa';
import { Card, Col, Row, Badge, Button, Form, InputGroup } from 'react-bootstrap'

export const CampaignDetails = ({ campaign, style }) => {
    const [amount, setAmount] = useState(0);
    const [isAmountValid, setIsAmountValid] = useState(true);
    const [amountError, setAmountError] = useState('');

    const amountChanged = (e) => {
        setAmount(e.target.value);

        setIsAmountValid(true);

        // Validate Amount
        if (isNaN(e.target.value)) {
            setAmountError('Value must be a number.');
            setIsAmountValid(false);
        } else if (e.target.value < 1) {
            setAmountError('Amount must be greater than zero.');
            setIsAmountValid(false);
        }
    }

    const donate = e => {
        e.preventDefault();
    }

    return (
        <Card style={style}>
            <Card.Body>
                <Row >
                    {/* Title */}
                    <Col md='5' className='my-auto'>
                        <h1 className={classes.Title}> {campaign.title} </h1>
                    </Col>

                    <Col md='7'>
                        {/* Status */}
                        <Row>
                            <Col lg='auto' className='ml-auto'>
                                <FaExclamationCircle className='mb-1' /> Status: {campaign.status}
                            </Col>
                        </Row>

                        {/* Start & End Dates */}
                        <Row className="my-4">
                            <Col lg>
                                Start Date  <FaCalendarAlt className='mb-1' /> : {campaign.startDate.toString()}
                            </Col>
                            <Col lg='auto' className='ml-auto'>
                                End Date    <FaCalendarAlt className='mb-1' /> : {campaign.endDate.toString()}
                            </Col>
                        </Row>

                        {/* Goal & Collected Amount*/}
                        <Row className="my-4" >
                            <Col lg style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                                Required Amount: <Badge variant="success">{campaign.amountInitialGoal}</Badge>
                            </Col>
                            <Col lg='auto' className='ml-auto' style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                                Collected Amount: <Badge variant="info">{campaign.amountCollected}</Badge>
                            </Col>
                        </Row>
                        <Row>

                        </Row>

                        {/* Description */}
                        <p className={classes.Description}> {campaign.description} </p>

                        <Row className="my-4">
                            <Col>
                                Created By <FaUsers className='mb-1' />  : {campaign.createdBy}
                            </Col>
                        </Row>

                        <Form>
                            <Row className="mt-4">
                                <Col>
                                    {/* Campaign Amount */}
                                    <Form.Group controlId="amount" >
                                        <InputGroup>
                                            <Form.Control size="lg" type="text" name='amount' value={amount} onChange={e => amountChanged(e)} isInvalid={!isAmountValid} />
                                            <InputGroup.Append>
                                                <InputGroup.Text>ETH</InputGroup.Text>
                                            </InputGroup.Append>
                                            <Form.Control.Feedback type='invalid'>{amountError}</Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Button type='submit' onSubmit={e => donate(e)} size="lg" className='px-5'>Donate Now!</Button>
                                </Col>
                            </Row>
                        </Form>

                    </Col>
                </Row>
            </Card.Body>

        </Card>
    );
}

