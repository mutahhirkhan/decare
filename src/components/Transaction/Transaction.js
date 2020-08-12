import React, { useState } from 'react';
import { Badge, Button, Row, Col } from 'react-bootstrap';
import { FaPlus, FaMinus, FaChevronCircleRight } from 'react-icons/fa';

export const Transaction = ({ transaction }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <React.Fragment>

            <tr>
                {/* Details */}
                <td><Button size='sm' onClick={() => setShowDetails(!showDetails)}> {showDetails ? <FaMinus /> : <FaPlus />} </Button></td>

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
            {
                showDetails &&
                transaction.transactions?.map(tx => <tr key={tx.txHash}>
                    <td>
                        <FaChevronCircleRight />
                    </td>
                    <td colSpan='8' style={{ background: '#b8dcff' }}>
                        <Row>
                            <Col md='10'>
                                {/* Recipients Address */}
                                    Transaction Hash: <a target='_blank' href={`https://ropsten.etherscan.io/address/${tx.txHash}`}>{tx.txHash}</a>
                            </Col>

                            <Col md='2'>
                                {/* Amount */}
                                    Amount: <b>{tx.amount}</b>
                            </Col>
                        </Row>
                    </td>
                </tr>)
            }
        </React.Fragment>
    );
}