import React from "react";
import { Donation } from "../Donation/Donation";
import { Table } from "react-bootstrap"

export const DonationList = ({ donations, style, onlyTransaction }) => {
    return (
        <Table responsive hover striped bordered style={style}>
            {
                !onlyTransaction &&
                <thead>
                    <tr>
                        <th></th>
                        <th>Username</th>
                        <th>Address</th>
                        <th>Amount</th>
                    </tr>
                </thead>
            }
            <tbody>
                {donations
                    .map(
                        d =>
                            <Donation key={d.personAddress} donation={d} onlyTransaction={onlyTransaction} />
                    )}
            </tbody>
        </Table>
    );
}