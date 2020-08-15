import React from 'react'
import { Button, Spinner } from 'react-bootstrap';

export const LoadingButton = ({ isloading, variant = 'primary', size = 'lg', disabled, children, onClick, type }) => {
    return (
        <div>
            <Button className='btn-block' onClick={onClick} variant={variant} type={type} size={size} disabled={isloading || disabled} >
                {isloading ? <Spinner animation="grow" variant="light" role="status" /> : children}
            </Button>
        </div>
    );
}