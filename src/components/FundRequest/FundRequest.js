import React from 'react'

export const FundRequest = ({ data }) => {
    return (
        <tr>
            <td>{data.description}</td>
            <td>{data.amount}</td>
            <td>{data.recipientsCount - data.disapproversCount}</td>
            <td>{data.disapproversCount}</td>
            <td>{data.createdAt.toDateString()}</td>
            <td>{data.status}</td>
        </tr>
    );
}