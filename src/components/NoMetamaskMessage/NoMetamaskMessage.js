import React from 'react'
import { Container, Row, Col, Form, Card } from 'react-bootstrap';


export const NoMetamaskMessage = () => {
    return (
        <Container>
            <Row className='vh-100 justify-content-center'>
                <Col className='my-auto mx-3' lg='4' md='6'>
                    <h1>No Metamask Found! You need metamask to use this Dapp, please install the meatamask extension before proceeding</h1>
                </Col>
            </Row>
        </Container>
    );
}