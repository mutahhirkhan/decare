import React from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap';


export const LoadingMessage = () => {
    return (
        <div className='vh-100 d-flex align-items-center'>
            <Container className='text-center'>
                <Row>
                    <Col>
                        <h3>Wait a moment.......<Spinner animation="grow" variant="primary" role="status" /></h3>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}