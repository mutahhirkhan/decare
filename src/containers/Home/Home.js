import React from 'react';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import image from '../../assets/home_image.jpg'

export const Home = props => {
    return (
        <div style={{ position: 'relative' }}>

            <Container style={{
                position: 'absolute',
                left: '100px',
                top: '150px'
            }} >
                <Row>
                    <Col xs={6} md='6'>
                        <h1 style={{ fontSize: '4.5rem', fontWeight: 'bold' }}>Decentralized Donation Plateform</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} className='mt-5'>
                        <Button size='lg' className='px-5' onClick={() => props.history.push('/campaigns')}>Donate Here</Button>
                    </Col>
                </Row>
            </Container>

            <Image src={image} style={{ width: '100%' }} />

        </div >

    );
}