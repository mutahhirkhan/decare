import React, { useState } from 'react'
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { LoadingButton } from '../LoadingButton/LoadingButton';

export const SignIn = () => {
    const [signContent, setsignContent] = useState('Sign In');
    return (
        <Container>
            <Row className='vh-100 justify-content-center' style={{ marginTop: '-50px' }}>
                <Col className='my-auto mx-3' lg='4' md='6'>
                    <Card style={{ boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)' }} border='light'>
                        <Card.Body>
                            <h1 className='my-3'>{signContent}</h1>
                            <Form >
                                {/* Email */}
                                <Form.Group controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>

                                {/* Campaign Title */}
                                <Form.Group controlId="title">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" />
                                </Form.Group>

                                <LoadingButton type='submit' onClick={(e) => e.preventDefault()}>
                                    {signContent}
                                </LoadingButton>
                                <div style={{ textDecoration: 'none', marginTop: '10px' }}>
                                    <a style={{ textDecoration: 'none' }}
                                        className='text-align-center mt-5'
                                        href="#">Don't have an account? Create Now!</a>
                                </div>

                            </Form>
                        </Card.Body>

                    </Card>

                </Col>
            </Row>
        </Container>
    );
}