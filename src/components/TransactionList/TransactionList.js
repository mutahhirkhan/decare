import React from "react";
import { Transaction } from "../Transaction/Transaction";
import { Table } from "react-bootstrap"

export const TransactionList = ({ transactions, style }) => {
    return (
        <Table responsive hover striped bordered style={style}>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Address</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {transactions
                    .map(
                        t =>
                            <Transaction key={t.personAddress} transaction={t} />
                    )}
            </tbody>
        </Table>
    );
}