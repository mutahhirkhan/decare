import React from 'react'
import { Campaign } from '../Campaign/Campaign';
import { Container, Col, Row } from 'react-bootstrap';
import { v4 as guid } from 'uuid';

export const CampaignList = ({ campaigns }) => {
    return (
        <Container style={{ maxWidth: '1300px' }}>
            <Row className='justify-content-center align-content-center'>
                {
                    campaigns.map((c, index) =>
                        <Col sm='auto' lg='4' md='6'>
                            <Campaign key={index+1} campaign={c} />
                        </Col>
                    )
                }
            </Row>
        </Container>
    );
}