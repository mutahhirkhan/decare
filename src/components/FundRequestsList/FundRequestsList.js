import React from 'react'
import { FundRequest } from '../FundRequest/FundRequest';
import { Table } from 'react-bootstrap';
import { v4 as guid } from 'uuid';

export const FundRequestsList = ({ requests }) => {
    return (
        <Table responsive hover striped bordered style={{ boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)' }}>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Approvers</th>
                    <th>Disapprovers</th>
                    <th>Created At</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {requests
                    .map(
                        r =>
                            <FundRequest key={guid()} data={r} />
                    )}
            </tbody>
        </Table>
    );
}