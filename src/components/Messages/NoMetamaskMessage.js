import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';


export const NoMetamaskMessage = () => {
    return (
        <div className='vh-100 d-flex align-items-center'>
            <Container className='text-center'>
                <Row >
                    <Col >
                        <h3>You need to install metamask to use this Dapp!</h3>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}