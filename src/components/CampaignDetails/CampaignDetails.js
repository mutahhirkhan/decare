import React, { useState, useEffect } from 'react'
import classes from './CampaignDetails.module.css'
import { FaCalendarAlt, FaUsers, FaExclamationCircle, FaTrashAlt } from 'react-icons/fa';
import { Card, Col, Row, Badge, Form, InputGroup, Alert } from 'react-bootstrap';
import { LoadingButton } from '../LoadingButton/LoadingButton';
import * as ethService from '../../services/ethereum/ethService';
import * as dbService from '../../services/firebase/databaseService';
import { showError, showSuccess } from '../../store/actions/alertAction';
import { useStore } from '../../context/GlobalState';
import { addTransactionState, setTransactionState } from '../../store/actions/transactionStatesActions';

export const CampaignDetails = ({ campaign, style, loadCampaignDetails, isManager }) => {

    const donationKey = `DONATING_${campaign.address}`;
    const withdrawnKey = `WITHDRAWING_${campaign.address}`;
    const closeKey = `DEACTIVATING_CAMPAIGN_${campaign.address}`;

    const [{ user, transactionStates }, dispatch] = useStore();
    const isDonating = transactionStates[donationKey];
    const isWithdrawing = transactionStates[withdrawnKey];
    const isClosing = transactionStates[closeKey];

    const [amount, setAmount] = useState(0);
    const [isAmountValid, setIsAmountValid] = useState(true);
    const [amountError, setAmountError] = useState('');

    useEffect(() => {
        dispatch(addTransactionState(donationKey));
        dispatch(addTransactionState(withdrawnKey));
        dispatch(addTransactionState(closeKey));
    }, [])

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

        dispatch(setTransactionState(true, donationKey));

        try {
            //do the transaction
            const tx = await ethService.donate(campaign.address, amount);

            //save transaction hash on db
            await dbService.addDonation(campaign.address, user.address, tx.transactionHash, amount);

            //show confirm message
            dispatch(showSuccess(`Thank you for donating ${amount} ETH.`));

            loadCampaignDetails();
        }
        catch (e) {
            dispatch(showError(e.message));
        }
        setAmount(0);
        dispatch(setTransactionState(false, donationKey));
    }

    const withdrawDonation = async () => {
        dispatch(setTransactionState(true, withdrawnKey));
        try {
            //with draw
            await ethService.withdrawDonation(campaign.address);

            //remove donation from db
            await dbService.deleteDonation(campaign.address, user.address);

            loadCampaignDetails();
        }
        catch (e) {
            dispatch(showError(e.message));
        }
        dispatch(setTransactionState(false, withdrawnKey));
    }

    const deactivateCampaign = async () => {
        dispatch(setTransactionState(true, closeKey));
        if (campaign.amountCollected !== campaign.amountSpended) {
            dispatch(showError('Campaign must not have unspended funds before closing it.'));
        }
        else {
            try {
                //de activate
                await ethService.deactivate(campaign.address);

                loadCampaignDetails();
            }
            catch (e) {
                dispatch(showError(e.message));
            }
        }
        dispatch(setTransactionState(false, closeKey));
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
                            <Col xs='auto' className='my-3'>
                                <FaExclamationCircle className='mb-1' /> Status:
                                <b style={{ color: campaign.status === 'Closed' ? 'red' : campaign.status === 'Goal Pending' ? '#ffcc00' : 'green' }} > {campaign.status}</b>
                            </Col>
                            {
                                (isManager && campaign.status === 'Closed') &&
                                <Col xs='auto' className='ml-auto my-3'>
                                    <LoadingButton isloading={isClosing} size='sm' variant='danger' onClick={deactivateCampaign}><FaTrashAlt /></LoadingButton>
                                </Col>
                            }
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

                        {/* Manager */}
                        <Row className="my-4">
                            <Col>
                                Manager <FaUsers className='mb-1' />  : {campaign.manager}
                            </Col>
                        </Row>

                        {/* Campaign Address */}
                        <Row className="my-4">
                            <Col>
                                Address : <a target='_blank' href={`https://ropsten.etherscan.io/address/${campaign.address}`}>{campaign.address}</a>
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
                                    {/* Donate */}
                                    <LoadingButton isloading={isDonating} disabled={campaign.status === 'Closed'} type='submit' size="lg">Donate Now!</LoadingButton>
                                </Col>
                            </Row>

                        </Form>
                        {/* Withdraw donation */}
                        {
                            campaign.isDonor &&
                            <Row className='justify-content-end'>
                                <Col className='mt-2' md={{ span: 6, offset: 6 }}><LoadingButton variant='danger' disabled={campaign.status === 'Locked' || campaign.status === 'Closed'} isloading={isWithdrawing} onClick={withdrawDonation}>Withdraw Donation</LoadingButton></Col>
                            </Row>
                        }
                        {/* Waiting message */}
                        {
                            (isDonating || isWithdrawing) &&
                            <Alert style={{ marginTop: '10px' }} variant='warning'>Please wait while transaction is in progress...</Alert>
                        }
                    </Col>
                </Row>

            </Card.Body>

        </Card>
    );
}

