import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';


export const InvalidNetworkMessage = () => {
    return (
        <div className='vh-100 d-flex align-items-center'>
            <Container className='text-center'>
                <Row >
                    <Col><h3>Please select Ropsten Test Network in Metamask to use this Dapp!</h3></Col>
                </Row>
            </Container>
        </div>
    );
}