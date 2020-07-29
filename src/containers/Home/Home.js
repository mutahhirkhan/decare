import React from 'react';
import { Container, Image, Row, Col, Button, Card } from 'react-bootstrap';
import image from '../../assets/home_image.png';

export const Home = props => {
    const cardStyle =
    {
        marginTop: '10px',
        marginBottom: '10px',
        color: 'white'
    }

    return (
        <div>
            <Row className='flex-row-reverse' style={{ marginRight: '0', marginLeft: '0' }}>
                <Col md='7' style={{ padding: '0' }}>
                    <Image src={image} style={{ width: '100%' }} className="img-fluid" />
                </Col>
                <Col md='4' className='align-self-center justify-self-right mt-5'>
                    <Row className='align-items-center justify-content-center'>
                        <h1 className='text-center' style={{ fontSize: '6vw', fontWeight: 'bold' }}>
                            <blockquote>Decentralized</blockquote>
                            <blockquote>Donation</blockquote>
                            <blockquote>Plateform</blockquote>
                        </h1>
                    </Row>
                    <Row className='align-items-center justify-content-center '>
                        <Button size='lg' className='px-5' onClick={() => props.history.push('/signin')}>Sign In</Button>
                    </Row>
                </Col>
            </Row>

            {/* Cards */}
            <Container className='my-5'>

                <Row className='align-content-stretch justify-content-around' >
                    <Col lg='3' style={cardStyle}>
                        <Card bg="danger" className='h-100' border='light'>
                            <Card.Body>
                                <h2>
                                    Transaprent Flow Of Funds
                            </h2>
                            Blockchain based solutions are transaparent and secure as any one can see and verify,
                            whats store in it and who manipulates it
                        </Card.Body>

                        </Card>
                    </Col>
                    <Col lg='3' style={cardStyle} >
                        <Card border='light' className='h-100' bg='success'>
                            <Card.Body>
                                <h2>
                                    Fast Money Transfer
                            </h2>
                            Funds can be transfered in no time, all around the world with zero transaction fee on a single Click.
                        </Card.Body>

                        </Card>
                    </Col>
                    <Col lg='3' style={cardStyle}>
                        <Card border='light' className='h-100' bg='warning'>
                            <Card.Body>
                                <h2>
                                    Control of donations
                            </h2>
                            Donors can control were funds are being spent, which are controled by fund requests. If donors don't trust the recipient they can disapprove the request.
                        </Card.Body>

                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>

    );
}