import React from 'react';
import { Container, Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const CreateCampaignForm = () => {
    return (
        <Container>
            <h1 className='my-4 text-center' style={{ fontWeight: 'bold' }}>Create Campaign</h1>
            <Form>

                {/* Campaign Title */}
                <Form.Group controlId="title">
                    <Form.Label>Campaign Title</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                {/* Campaign Description */}
                <Form.Group controlId="description">
                    <Form.Label>Campaign Description</Form.Label>
                    <Form.Control as="textarea" rows="6" />
                </Form.Group>


                {/* Campaign Amount */}
                <Form.Group controlId="title">
                    <Form.Label>Amount</Form.Label>
                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text>ETH</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" />
                    </InputGroup>
                </Form.Group>

                <Form.Row>
                    {/* Start Date */}
                    <Col>
                        <Row>
                            <Form.Label className='mx-3'>Start Date</Form.Label>
                        </Row>
                        <Row>
                            <DatePicker className='mx-3' />
                        </Row>
                    </Col>

                    {/* End Date */}
                    <Col>
                        <Row>
                            <Form.Label className='mx-3'>End Date</Form.Label>
                        </Row>
                        <Row>
                            <DatePicker className='mx-3' />
                        </Row>
                    </Col>

                </Form.Row>
                <Button variant="primary" className='px-5 mt-4' size='lg' type="submit" onClick={(e) => e.preventDefault()}>
                    Create
                </Button>
            </Form>
        </Container>


    );
}