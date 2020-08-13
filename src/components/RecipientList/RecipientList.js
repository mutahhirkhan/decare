import React from 'react';
import { Table } from 'react-bootstrap';
import { FaChevronCircleRight } from 'react-icons/fa';

export const RecipientList = ({ recipients }) => {
    return (
        <Table style={{ margin: 0 }}>
            <thead>
                <tr style={{ background: '#0384fc', color: 'white' }}>
                    <th></th>
                    <th>Recipient Address</th>
                    <th>Amount Delegated</th>
                </tr>
            </thead>
            <tbody>
                {
                    recipients?.map(r =>
                        <tr key={r.address} style={{ background: '#b8dcff' }}>
                            <td>
                                <FaChevronCircleRight />
                            </td>
                            <td >
                                {/* Recipients Address */}
                                <a target='_blank' href={`https://ropsten.etherscan.io/address/${r.address}`}>{r.address}</a>
                                {/* </Col> */}
                            </td>
                            <td>
                                {/* Amount */}
                                <b>{r.amount}</b>
                            </td>
                        </tr>
                    )
                }
            </tbody>

        </Table>
    )
} 