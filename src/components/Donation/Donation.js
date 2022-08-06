import React, { useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { TransactionList } from '../TransactionList/TransactionList';
import { useStore } from '../../context/GlobalState';

export const Donation = ({ donation, onlyTransaction }) => {
    const [{ appState:{currentNetwork} }] = useStore();

    const [showDetails, setShowDetails] = useState(!!onlyTransaction);
    return (

        <React.Fragment>
            {
                !onlyTransaction &&
                < tr >
                    {/* Details */}
                    < td > <Button size='sm' onClick={() => setShowDetails(!showDetails)}> {showDetails ? <FaMinus /> : <FaPlus />} </Button></td>

                    {/* User */}
                    <td>
                        {donation.username}
                    </td>

                    {/* Address */}
                    <td>
                        <a target='_blank' href={`https://ropsten.etherscan.io/address/${donation.personAddress}`}>{donation.personAddress}</a>
                    </td>

                    {/* Amount */}
                    <td>
                        <Badge variant="success">{donation.amount} ETH</Badge>
                    </td>

                </tr >
            }
            {
                showDetails &&
                <tr>
                    <td></td>
                    <td colSpan='3' >
                        <TransactionList transactions={donation.transactions} network={currentNetwork} />
                    </td>
                </tr>
            }
        </React.Fragment >
    );
}