import React from 'react';
import { Table } from 'react-bootstrap';
import { FaChevronCircleRight } from 'react-icons/fa';

export const TransactionList = ({ transactions }) => {
    return (
        <Table responsive style={{ margin: 0 }}>
            <thead>
                <tr style={{ background: '#0384fc', color: 'white' }}>
                    <th></th>
                    <th>Transaction Hash</th>
                    <th>Amount </th>
                </tr>
            </thead>
            <tbody>
                {
                    transactions?.map(tx =>
                        <tr key={tx.txHash} style={{ background: '#b8dcff' }}>
                            <td>
                                <FaChevronCircleRight />
                            </td>
                            <td >
                                {/*Transaction Hash */}
                                <a target='_blank' href={`https://ropsten.etherscan.io/tx/${tx.txHash}`}>{tx.txHash}</a>
                            </td>
                            <td>
                                {/* Amount */}
                                <b>{tx.amount} ETH</b>
                            </td>
                        </tr>
                    )
                }
            </tbody>

        </Table>
    )
} 