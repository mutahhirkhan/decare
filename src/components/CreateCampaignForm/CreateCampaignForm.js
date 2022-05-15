import React, { useEffect } from 'react';
import { Container, Form, Col, Row, InputGroup, Alert } from 'react-bootstrap';
import { createCampaign } from '../../store/actions/campaignActions';
import { useStore } from '../../context/GlobalState';
import { Formik, Field } from "formik";
import { useHistory } from 'react-router-dom';
import { LoadingButton } from '../LoadingButton/LoadingButton';
import { addTransactionState, setTransactionState } from '../../store/actions/transactionStatesActions';
import * as yup from 'yup';

export const CreateCampaignForm = () => {
    const campaginKey = `CREATING_CAMPAIGN`;

    const [{ user, transactionStates }, dispatch] = useStore();
    const isCreating = transactionStates[campaginKey];
    const routeHistory = useHistory();

    useEffect(() => {
        dispatch(addTransactionState(campaginKey));
    }, [])


    const validationSchema = yup.object({
        title: yup.string().required('Title is required.'),
        description: yup.string().required('Description is required.'),
        amount: yup.number().required('Amount is required').moreThan(0, 'Amount must be greate than zero.'),
        startDate: yup.date().required(),
        endDate: yup.date().min(new Date(), 'Closing Date should be greater than current date.')
    });

    const endDateValue = new Date();
    endDateValue.setDate(new Date().getDate() + 1);

    const createCampaign = async (data, formikProps) => {
        dispatch(setTransactionState(true, campaginKey));
        let campaign = {
            title: data.title,
            description: data.description,
            amount: data.amount,
            createTimestamp: Math.floor(new Date(data.startDate).getTime() / 1000),
            closeTimestamp: Math.floor(new Date(data.endDate).getTime() / 1000)
        };

        // deploy contract
        const address = await createCampaign(campaign, user, dispatch);

        if (address) {
            routeHistory.push(`/campaign${address}`);
        }
        formikProps.resetForm();
        dispatch(setTransactionState(false, campaginKey));
    }

    return (
        <Container>
            <h1 className='my-4 text-center' style={{ fontWeight: 'bold' }}>Create Campaign</h1>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    amount: 0,
                    startDate: new Date().toISOString().substr(0, 10),
                    endDate: endDateValue.toISOString().substr(0, 10),
                }}
                validationSchema={validationSchema}
                // onSubmit={async (data, { resetForm }) => {
                //     dispatch(setTransactionState(true, campaginKey));
                //     let campaign = {
                //         title: data.title,
                //         description: data.description,
                //         amount: data.amount,
                //         createTimestamp: Math.floor(new Date(data.startDate).getTime() / 1000),
                //         closeTimestamp: Math.floor(new Date(data.endDate).getTime() / 1000)
                //     };

                //     // deploy contract
                //     const address = await createCampaign(campaign, user, dispatch);

                //     if (address) {
                //         routeHistory.push(`/campaign${address}`);
                //     }
                //     resetForm();
                //     dispatch(setTransactionState(false, campaginKey));

                // }}
                onSubmit={(data, formikProps) => createCampaign(data, formikProps)}
            >
                {({ handleSubmit, handleChange, errors, values, touched }) => (
                    <Form onSubmit={handleSubmit}>

                        {/* Campaign Title */}
                        <Form.Group controlId="title">
                            <Form.Label>Campaign Title</Form.Label>
                            <Field as={Form.Control} type="text" name='title' isInvalid={touched.title && !!errors.title} />
                            <Form.Control.Feedback type='invalid'>{errors.title}</Form.Control.Feedback>
                        </Form.Group>

                        {/* Campaign Description */}
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="4" value={values.description} onChange={handleChange} name='description' isInvalid={touched.description && !!errors.description} />
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
                                    <Field as={Form.Control} type="date" disabled={true} name='startDate' isInvalid={touched.startDate && !!errors.startDate} />
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
                                isCreating &&
                                <Col>
                                    <Alert style={{ marginBottom: '0' }} variant='warning'>Please wait while transaction is in progress...</Alert>
                                </Col>
                            }
                            <Col md="auto" >
                                <LoadingButton isloading={isCreating} type='submit' className='px-5'>
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

