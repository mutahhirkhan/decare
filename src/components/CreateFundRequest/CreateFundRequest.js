import React, { useState } from 'react'
import { Formik, Field } from 'formik';
import { Container, Form, Col, Row, InputGroup, Alert, Button } from 'react-bootstrap';
import { LoadingButton } from '../LoadingButton/LoadingButton';

export const CreateFundRequest = ({ createRequest, loadCampaignDetails }) => {
    const [request, setRequest] = useState({
        description: '',
        amount: 0,
        recipients: []
    });

    const addRecipient = () => {
        setRequest(prevData => {
            return {
                ...prevData,
                recipients: [
                    ...prevData.recipients,
                    { address: '', amount: '' }
                ]
            }
        })
    }

    return (
        <Container>
            <Formik
                initialValues={request}

                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true);

                    const addresses = data.recipients.map(i => i.address);
                    const amounts = data.recipients.map(i => parseInt(i.amount));
                    console.log('Data', data);
                    console.log(addresses, amounts);
                    await createRequest(data.description, data.amount, addresses, amounts);

                    setSubmitting(false);

                    loadCampaignDetails();
                }}

                validate={values => {
                    const errors = {};

                    // // Vaidate Title
                    // if (values.title.length === 0) {
                    //     errors.title = 'Title cannot be empty.';
                    // }

                    // // Validate Description
                    // if (values.description.length === 0) {
                    //     errors.description = 'Description cannot be empty.';
                    // }

                    // // Validate Amount
                    // if (isNaN(values.amount)) {
                    //     errors.amount = 'Value must be a number.';
                    // } else if (values.amount < 1) {
                    //     errors.amount = 'Amount must be greater than zero.';
                    // }


                    // // Validate Start Date & End Date
                    // if (!values.startDate) {
                    //     errors.startDate = 'Date cannot be empty.';
                    // }
                    // if (!values.endDate) {
                    //     errors.endDate = 'Date cannot be empty.';
                    // }

                    // let start = new Date(values.startDate);
                    // let end = new Date(values.endDate);

                    // //start date should always be lesser than the end date
                    // if (start.getTime() >= end.getTime()) {
                    //     errors.startDate = 'Start date should be less than end date.';
                    //     errors.endDate = 'End date should be greater than end date.';
                    // }

                    return errors;
                }}

            >
                {({ handleSubmit, errors, touched, isSubmitting }) => (
                    <Form onSubmit={handleSubmit} className='mt-3'>

                        {/* Campaign Description */}
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Field as={Form.Control} type="textarea" rows="6" name='description' isInvalid={touched.description && !!errors.description} />
                            <Form.Control.Feedback type='invalid'>{errors.description}</Form.Control.Feedback>
                        </Form.Group>


                        {/* Campaign Amount */}
                        <Form.Group controlId="amount">
                            <Form.Label>Total Amount</Form.Label>
                            <InputGroup className="mb-2">
                                <Field as={Form.Control} type="text" name='amount' isInvalid={touched.amount && !!errors.amount} />
                                <InputGroup.Append>
                                    <InputGroup.Text>ETH</InputGroup.Text>
                                </InputGroup.Append>
                                <Form.Control.Feedback type='invalid'>{errors.amount}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Container style={{ background: '#e9ecef', padding: '10px', borderRadius: '5px' }}>
                            {
                                request.recipients.map((r, index) => {
                                    return (
                                        <Form.Row>

                                            {/* Recipient address */}
                                            <Col md='8'>
                                                <Form.Group>
                                                    <Form.Label>Recipient Address</Form.Label>
                                                    <Field as={Form.Control} type="text" name={`recipients.${index}.address`}
                                                    // isInvalid={touched.recipients[index]?.address && !!errors?.recipients[index]?.address}
                                                    />
                                                    <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            {/* Amount */}
                                            <Col md='4'>
                                                <Form.Group>
                                                    <Form.Label>Amount Delegated</Form.Label>
                                                    <Field as={Form.Control} type="text" name={`recipients.${index}.amount`}
                                                    // isInvalid={touched.recipients[index]?.amount && !!errors?.recipients[index]?.amount}
                                                    />
                                                    <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                        </Form.Row>
                                    )
                                })
                            }
                            <Row className='justify-content-end align-items-end my-4'>
                                <Col md="auto" >
                                    <Button variant='secondary' onClick={addRecipient}>
                                        Add Recipient
                                </Button>
                                </Col>
                            </Row>
                        </Container>

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
    );
}