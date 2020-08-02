import React from 'react'
import { Button, Spinner } from 'react-bootstrap';

export const LoadingButton = props => {
    return (
        <div>
            <Button className='btn-block' size='lg' {...props} disabled={props.isloading}>
                {props.isloading ? <Spinner animation="grow" variant="light" role="status" /> : props.children}
            </Button>
        </div>
    );
}