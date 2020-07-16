import React from 'react'
import classes from './CampaignDetails.module.css'
import { FaCalendarAlt, FaUsers, FaExclamationCircle } from 'react-icons/fa';
import { IconContext } from "react-icons"
import { Container, Col, Row, Badge } from 'react-bootstrap'

export const CampaignDetails = ({ campaign }) => {
    return (
        <Container className='mt-5'>
            <Row className='mx-4'>

                {/* Title */}
                <Col md='5'>
                    <h1 className={classes.Title}> {campaign.title} </h1>
                </Col>

                {/* Description */}
                <Col md='7'>
                    {/* Status */}
                    <Row>
                        <Col lg='auto' className='ml-auto'>
                            <FaExclamationCircle className='mb-1' /> Status: {campaign.status}
                        </Col>
                    </Row>

                    {/* Start & End Dates */}
                    <Row className="my-4">
                        <Col lg>
                            Start Date  <FaCalendarAlt className='mb-1' /> : {campaign.startDate}
                        </Col>
                        <Col lg='auto' className='ml-auto'>
                            End Date    <FaCalendarAlt className='mb-1' /> : {campaign.endDate}
                        </Col>
                    </Row>

                    {/* Goal & Collected Amount*/}
                    <Row className="my-4" >
                        <Col lg style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                            Goal Amount: <Badge variant="success">{campaign.goalAmount}</Badge>
                        </Col>
                        <Col lg='auto' className='ml-auto' style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                            Collected Amount: <Badge variant="info">{campaign.collectedAmount}</Badge>
                        </Col>
                    </Row>
                    <Row>

                    </Row>

                    <p className={classes.Description}> {campaign.description} </p>

                    <Row className="my-4">
                        <Col>
                            Created By <FaUsers className='mb-1' />  : {campaign.createdBy}
                        </Col>
                    </Row>




                </Col>
            </Row>

        </Container>
    );
}

