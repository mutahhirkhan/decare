import React from 'react'
import { Form, Col, Row, Container, Image, Button } from 'react-bootstrap';

export const ProfileDetails = () => {
    return (
        <React.Fragment>
            <Container className='justify-content-center'>
                <Row >
                    <Col md='auto' className='mx-auto mt-5'>
                        <Image src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                            roundedCircle
                            height='200px' />
                    </Col>
                </Row>
                <Row >
                    <Col md='auto' className='mx-auto mt-1 mb-5'>
                        <Button>Upload Image</Button>
                    </Col>
                </Row>
            </Container>
            <Form>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Name
                </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" placeholder="Your Name Here..." />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Organization Name
                </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" placeholder="Your Organization Name Here...." />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Email
                </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue="email@example.com" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Bio
                </Form.Label>
                    <Col sm="10">
                        <Form.Control placeholder="Tell something about yourself here..." />
                    </Col>
                </Form.Group>
            </Form>
        </React.Fragment>
    );
}
