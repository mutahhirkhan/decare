import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';


export const InvalidAccountMessage = ({ signOutHandler, address }) => {
    return (
        <div className='vh-100 d-flex align-items-center'>
            <Container className='text-center'>
                <Row >
                    <Col>Please selected your account : {address} </Col>
                </Row>
                <Row>
                    <Col><Button onClick={signOutHandler}>Sign Out</Button> </Col>
                </Row>
            </Container>
        </div>
    );
}