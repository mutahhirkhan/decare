import React, { useState } from 'react';
import { Container, Form, Col, Row, InputGroup, Alert } from 'react-bootstrap';
import { createCampaign } from '../../store/actions/campaignActions';
import { useStore } from '../../context/GlobalState';
import { Formik, Field } from "formik";
import { useHistory } from 'react-router-dom';
import { LoadingButton } from '../LoadingButton/LoadingButton';

export const CreateCampaignForm = () => {

    const dispatch = useStore()[1];
    const routeHistory = useHistory();

    return (
        <Container>
            <h1 className='my-4 text-center' style={{ fontWeight: 'bold' }}>Create Campaign</h1>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    amount: 0,
                    startDate: '',
                    endDate: '',
                }}

                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true);

                    let campaign = {
                        title: data.title,
                        description: data.description,
                        amount: data.amount,
                        createTimestamp: Math.floor(new Date(data.startDate).getTime() / 1000),
                        closeTimestamp: Math.floor(new Date(data.endDate).getTime() / 1000)
                    };

                    // deploy contract
                    let wasSuccess = await createCampaign(campaign, dispatch);

                    if (wasSuccess) {
                        routeHistory.push('/my_campaigns');
                    }
                    setSubmitting(false);

                }}

                validate={values => {
                    const errors = {};

                    // Vaidate Title
                    if (values.title.length === 0) {
                        errors.title = 'Title cannot be empty.';
                    }

                    // Validate Description
                    if (values.description.length === 0) {
                        errors.description = 'Description cannot be empty.';
                    }

                    // Validate Amount
                    if (isNaN(values.amount)) {
                        errors.amount = 'Value must be a number.';
                    } else if (values.amount < 1) {
                        errors.amount = 'Amount must be greater than zero.';
                    }


                    // Validate Start Date & End Date
                    if (!values.startDate) {
                        errors.startDate = 'Date cannot be empty.';
                    }
                    if (!values.endDate) {
                        errors.endDate = 'Date cannot be empty.';
                    }

                    let start = new Date(values.startDate);
                    let end = new Date(values.endDate);

                    //start date should always be lesser than the end date
                    if (start.getTime() >= end.getTime()) {
                        errors.startDate = 'Start date should be less than end date.';
                        errors.endDate = 'End date should be greater than end date.';
                    }

                    return errors;
                }}

            >
                {({ handleSubmit, errors, touched, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>

                        {/* Campaign Title */}
                        <Form.Group controlId="title">
                            <Form.Label>Campaign Title</Form.Label>
                            <Field as={Form.Control} type="text" name='title' isInvalid={touched.title && !!errors.title} />
                            <Form.Control.Feedback type='invalid'>{errors.title}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Campaign Description */}
                        <Form.Group controlId="description">
                            <Form.Label>Campaign Description</Form.Label>
                            <Field as={Form.Control} type="textarea" rows="6" name='description' isInvalid={touched.description && !!errors.description} />
                            <Form.Control.Feedback type='invalid'>{errors.description}</Form.Control.Feedback>
                        </Form.Group>


                        {/* Campaign Amount */}
                        <Form.Group controlId="amount">
                            <Form.Label>Amount</Form.Label>
                            <InputGroup className="mb-2">
                                <Field as={Form.Control} type="text" name='amount' isInvalid={touched.amount && !!errors.amount} />
                                <InputGroup.Append>
                                    <InputGroup.Text>ETH</InputGroup.Text>
                                </InputGroup.Append>
                                <Form.Control.Feedback type='invalid'>{errors.amount}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Row>

                            {/* Start Date */}
                            <Col>
                                <Form.Group controlId="startDate">
                                    <Form.Label>Start Date</Form.Label>
                                    <Field as={Form.Control} type="date" name='startDate' isInvalid={touched.startDate && !!errors.startDate} />
                                    <Form.Control.Feedback type='invalid'>{errors.startDate}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            {/* End Date */}
                            <Col>
                                <Form.Group controlId="startDate">
                                    <Form.Label>End Date</Form.Label>
                                    <Field as={Form.Control} type="date" name='endDate' isInvalid={touched.endDate && !!errors.endDate} />
                                    <Form.Control.Feedback type='invalid'>{errors.endDate}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                        </Form.Row>


                        <Row className='justify-content-end align-items-end my-4'>
                            {
                                isSubmitting &&
                                <Col>
                                    <Alert style={{ marginBottom: '0' }} variant='warning'>Please wait while transaction is in progress...</Alert>
                                </Col>
                            }
                            <Col md="auto" >
                                <LoadingButton isLoading={isSubmitting} type='submit' className='px-5'>
                                    Create
                                </LoadingButton>
                            </Col>
                        </Row>

                    </Form>
                )}
            </Formik>
        </Container >

    )
}

