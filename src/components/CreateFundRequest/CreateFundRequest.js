import React, { useEffect } from 'react'
import { Formik, Field, FieldArray } from 'formik';
import { Container, Form, Col, Row, InputGroup, Alert, Button } from 'react-bootstrap';
import { LoadingButton } from '../LoadingButton/LoadingButton';
import { v4 as guid } from 'uuid';
import { FaTimes } from 'react-icons/fa';
import * as yup from 'yup';
import { useStore } from '../../context/GlobalState';
import { addTransactionState, setTransactionState } from '../../store/actions/transactionStatesActions';

export const CreateFundRequest = ({ createRequest, loadCampaignDetails, campaign }) => {
    const fundReqKey = `CREATING_FUND_REQUEST_${campaign.address}`;

    const [{ transactionStates }, dispatch] = useStore();
    const isCreating = transactionStates[fundReqKey];

    useEffect(() => {
        dispatch(addTransactionState(fundReqKey));
    }, [])

    //helper method
    const numOr0 = n => isNaN(+n) ? 0 : +n;

    const getTotalAmount = (recipients, value, index) => {
        let sum = 0;
        if (recipients) {
            recipients.forEach((value, i) => {
                if (i != index)
                    sum += parseFloat(numOr0(value.amount));
            });
        }
        return sum + parseFloat(numOr0(value));
    }

    const schema = yup.object({
        description: yup.string().required('Description is required'),
        amount: yup.number().required('Amount is required')
            .max(campaign.amountCollected - campaign.amountDelegated - campaign.amountSpended, "You don't have enough funds in campaign."),
        recipients: yup.array().of(
            yup.object({
                address: yup.string().required('Address is required').matches('^0x[a-fA-F0-9]{40}$', 'Invalid address'),
                amount: yup.number().required('amount cannot be empty')
            })
        )
    });

    return (
        campaign.status !== 'Locked' ? <div>Campaign must reach its goal and be Locked before you can create a fund request.</div>
            : <Container>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        description: '',
                        amount: 0,
                        recipients: []
                    }}
                    onSubmit={async (data, { resetForm }) => {
                        dispatch(setTransactionState(true, fundReqKey));

                        const addresses = data.recipients.map(i => i.address);
                        const amounts = data.recipients.map(i => i.amount);
                        resetForm();

                        await createRequest(data.description, data.amount, addresses, amounts);

                        dispatch(setTransactionState(false, fundReqKey));


                        loadCampaignDetails();
                    }}

                >
                    {({ handleSubmit, handleChange, setFieldValue, errors, values }) => (
                        <Form onSubmit={handleSubmit} className='mt-3'>

                            {/* Request Description */}
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="2" value={values.description} onChange={handleChange} name='description' isInvalid={!!errors.description} />
                                <Form.Control.Feedback type='invalid'>{errors.description}</Form.Control.Feedback>
                            </Form.Group>


                            {/* Campaign Amount */}
                            <Form.Group controlId="amount">
                                <Form.Label>Total Amount</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control disabled={true}
                                        type='text'
                                        value={values.amount}
                                        onChange={handleChange} name='amount' isInvalid={!!errors.amount} />
                                    <InputGroup.Append>
                                        <InputGroup.Text>ETH</InputGroup.Text>
                                    </InputGroup.Append>
                                    <Form.Control.Feedback type='invalid'>{errors.amount}</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <FieldArray name='recipients'>
                                {
                                    arrayHelpers => (
                                        <Container style={{ background: '#e9ecef', padding: '10px', borderRadius: '5px' }}>
                                            {
                                                values.recipients.map((r, index) => {
                                                    return (
                                                        <Form.Row key={r.key}>

                                                            {/* Recipient address */}
                                                            <Col md='8'>
                                                                <Form.Group>
                                                                    <Form.Label>Recipient Address</Form.Label>
                                                                    <Field as={Form.Control} type="text" name={`recipients.${index}.address`}
                                                                        isInvalid={errors.recipients && !!errors.recipients[index]?.address} />
                                                                    <Form.Control.Feedback type='invalid'>{errors.recipients && errors.recipients[index]?.address}</Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>

                                                            {/* Amount */}
                                                            <Col md='3'>
                                                                <Form.Group>
                                                                    <Form.Label>Amount Delegated</Form.Label>
                                                                    <Form.Control type="text" name={`recipients.${index}.amount`} value={values.recipients[index].amount}
                                                                        onChange={e => {
                                                                            handleChange(e);
                                                                            setFieldValue('amount', getTotalAmount(values.recipients, e.target.value, index));
                                                                        }}
                                                                        isInvalid={errors.recipients && !!errors.recipients[index]?.amount} />
                                                                    <Form.Control.Feedback type='invalid'>{errors.recipients && errors.recipients[index]?.amount}</Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>

                                                            {/* Delete Button */}
                                                            <Col md='1' className='align-self-start' style={{ marginTop: '32px' }}>
                                                                <Button variant='danger' onClick={() => arrayHelpers.remove(index)}><FaTimes /> </Button>
                                                            </Col>

                                                        </Form.Row>
                                                    )
                                                })
                                            }
                                            <Row className='justify-content-end align-items-end my-4'>
                                                <Col md="auto" >
                                                    <Button variant='secondary' onClick={() => arrayHelpers.push({ key: guid(), address: '', amount: '' })}> Add Recipient </Button>
                                                </Col>
                                            </Row>

                                        </Container>
                                    )
                                }
                            </FieldArray>



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
    );
}