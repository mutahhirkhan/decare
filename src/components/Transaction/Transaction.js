import React from 'react';
import { Container, Col, Row, Badge } from 'react-bootstrap'


export const Transaction = ({ transaction }) => {
    return (
        <tr>
            {/* User */}
            <td>
                {transaction.username}
            </td>

            {/* Transaction Hash */}
            <td>
                {transaction.txHash}
            </td>

            {/* Created Date */}
            <td>
                {transaction.createdDate}
            </td>

            {/* Amount */}
            <td>
                {transaction.amount}
            </td>

            {/* Status */}
            <td>
                <Badge variant={transaction.status == 'Success' ? 'success' : 'danger'}>{transaction.status}</Badge>
            </td>
        </tr>
    );
}