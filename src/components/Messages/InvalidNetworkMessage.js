import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';


export const InvalidNetworkMessage = () => {
    return (
        <div className='vh-100 d-flex align-items-center'>
            <Container className='text-center'>
                <Row >
                    <Col>Please select Ropsten Test Network to use this Dapp!</Col>
                </Row>
            </Container>
        </div>
    );
}