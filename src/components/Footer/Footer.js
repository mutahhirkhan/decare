import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';

export const Footer = () => {
    return (

        <div style={{ background: '#0000a1', height: '60px', paddingTop: '5px', marginTop: 'auto' }} >
            <Row style={{ marginRight: '0', marginLeft: '0' }} className='justify-content-center'>
                <Col xs='auto'>
                    <a href='https://github.com/mutahhirkhan/decare/' target="_blank" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>Github</a>
                </Col>
            </Row>
            <Row style={{ marginRight: '0', marginLeft: '0', color: 'white' }} className='justify-content-center'>
                <Col xs='auto'>
                    © 2020 Copyright:
                    <a href="https://mdbootstrap.com/" style={{ textDecoration: 'none', color: 'white' }}> DeCare</a>
                </Col>
            </Row>
        </div>
    );
}