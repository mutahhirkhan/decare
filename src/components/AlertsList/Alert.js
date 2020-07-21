import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

export const Alert = ({ type, message, wasShown }) => {
    const [show, setShow] = useState(true);

    const closeAlert = () => {
        setShow(false);
        wasShown = false;
    }

    let title;
    let backgroundColor;
    let bodyColor = 'white';
    let titleColor;
    switch (type) {
        case 'ERROR':
            title = 'Error!';
            backgroundColor = 'red';
            titleColor = 'red'
            break;
        case 'WARNING':
            title = 'Warning!';
            backgroundColor = '#fcba03';
            titleColor = '#fcba03';
            break;
        case 'SUCCESS':
            title = 'Success!';
            backgroundColor = 'green';
            titleColor = 'green';
            break;
        case 'MESSAGE':
            title = 'Message!';
            backgroundColor = 'white';
            bodyColor = 'gray';
            titleColor = 'dimgrey';
            break;
        default:
            break;
    }
    return (
        <Toast
            className='mx-5'
            style={{ backgroundColor: backgroundColor, width: '300px' }}
            show={show}
            onClose={closeAlert}
            delay={5000}
            autohide={true}>
            <Toast.Header>
                <strong className="mr-auto" style={{ color: titleColor }}>{title}</strong>
            </Toast.Header>
            <Toast.Body style={{ color: bodyColor }}>{message}</Toast.Body>
        </Toast >
    );
}