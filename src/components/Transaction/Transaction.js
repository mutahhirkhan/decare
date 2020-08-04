import React from 'react';
import { Badge } from 'react-bootstrap';


export const Transaction = ({ transaction }) => {
    return (
        <tr>
            {/* User */}
            <td>
                {transaction.username}
            </td>

            {/* Address */}
            <td>
                {transaction.personAddress}
            </td>

            {/* Amount */}
            <td>
                <Badge variant="success">{transaction.amount}</Badge>
            </td>

        </tr>
    );
}