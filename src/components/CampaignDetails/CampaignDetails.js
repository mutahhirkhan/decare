import React, { useState } from 'react'
import classes from './CampaignDetails.module.css'
import { FaCalendarAlt, FaUsers, FaExclamationCircle } from 'react-icons/fa';
import { Card, Col, Row, Badge, Form, InputGroup, Alert } from 'react-bootstrap';
import { LoadingButton } from '../LoadingButton/LoadingButton';
import { donate } from '../../services/ethereum/ethService';
import { useStore } from '../../context/GlobalState';
import { showError, showSuccess } from '../../store/actions/alertAction';

export const CampaignDetails = ({ campaign, style, loadCampaignDetails }) => {
    const [amount, setAmount] = useState(0);
    const [isAmountValid, setIsAmountValid] = useState(true);
    const [amountError, setAmountError] = useState('');
    const [isDonating, setIsDonating] = useState(false);

    const [_, dispatch] = useStore();

    const amountChanged = (value) => {
        setAmount(value);

        let valid = true;

        // Validate Amount
        if (isNaN(value)) {
            setAmountError('Value must be a number.');
            valid = false;
        } else if (value < 1) {
            setAmountError('Amount must be greater than zero.');
            valid = false;
        }
        setIsAmountValid(valid);
        return valid;
    }

    const _donate = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!amountChanged(amount))
            return;

        setIsDonating(true);

        try {
            //do the transaction
            await donate(campaign.address, amount);

            //show confirm message
            dispatch(showSuccess(`Thank you for donating ${amount} ETH.`));

            loadCampaignDetails();
        }
        catch (e) {
            dispatch(showError(e.message));
        }
        setAmount(0);
        setIsDonating(false);
    }

    return (
        <Card style={style}>
            <Card.Body>
                <Row >
                    {/* Title */}
                    <Col lg='5' className='my-auto'>
                        <h1 className={classes.Title}> {campaign.title} </h1>
                    </Col>

                    <Col lg='7'>
                        {/* Status */}
                        <Row>
                            <Col lg='auto' className='ml-auto my-3'>
                                <FaExclamationCircle className='mb-1' /> Status: {campaign.status}
                            </Col>
                        </Row>

                        {/* Start & End Dates */}
                        <Row >
                            <Col lg className="mb-3">
                                Start Date  <FaCalendarAlt className='mb-1' /> : {campaign.createdAt.toDateString()}
                            </Col>
                            <Col lg='auto' className='ml-auto mb-3'>
                                End Date    <FaCalendarAlt className='mb-1' /> : {campaign.closedAt.toDateString()}
                            </Col>
                        </Row>

                        {/* Goal & Collected Amount*/}
                        <Row  >
                            <Col lg className={classes.Amount}>
                                Required Amount: <Badge variant="danger">{campaign.amountInitialGoal}</Badge>
                            </Col>
                            <Col lg='auto' className={classes.Amount}>
                                Collected Amount: <Badge variant="info">{campaign.amountCollected}</Badge>
                            </Col>
                        </Row>

                        {/* Spended & Delegated Amount*/}
                        <Row  >
                            <Col lg className={classes.Amount}>
                                Spended Amount: <Badge variant="success">{campaign.amountSpended}</Badge>
                            </Col>
                            <Col lg='auto' className={classes.Amount}>
                                Delegated Amount: <Badge variant="warning">{campaign.amountDelegated}</Badge>
                            </Col>
                        </Row>

                        {/* Description */}
                        <p className={classes.Description}> {campaign.description} </p>

                        <Row className="my-4">
                            <Col>
                                Manager <FaUsers className='mb-1' />  : {campaign.manager}
                            </Col>
                        </Row>

                        <Form onSubmit={_donate} >
                            <Row className="mt-4">
                                <Col sm='6'>
                                    {/* Campaign Amount */}
                                    <Form.Group controlId="amount" >
                                        <InputGroup>
                                            <Form.Control size="lg" type="text" name='amount' value={amount} onChange={e => amountChanged(e.target.value)} isInvalid={!isAmountValid} />
                                            <InputGroup.Append>
                                                <InputGroup.Text>ETH</InputGroup.Text>
                                            </InputGroup.Append>
                                            <Form.Control.Feedback type='invalid'>{amountError}</Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col sm='6'>
                                    <LoadingButton isloading={isDonating} type='submit' size="lg">Donate Now!</LoadingButton>
                                </Col>
                            </Row>
                            {
                                isDonating &&
                                <Alert variant='warning'>Please wait while transaction is in progress...</Alert>
                            }

                        </Form>

                    </Col>
                </Row>
            </Card.Body>

        </Card>
    );
}

