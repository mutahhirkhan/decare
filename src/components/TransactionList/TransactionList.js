import React from "react";
import { Transaction } from "../Transaction/Transaction";
import { Table } from "react-bootstrap"

export const TransactionList = ({ transactions, style }) => {
    return (
        <React.Fragment>
            {
                <Table hover striped bordered style={style}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Transactio Hash</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions
                            .map(
                                t =>
                                    <Transaction key={t.txHash} transaction={t} />
                            )}
                    </tbody>
                </Table>}
        </React.Fragment>


    );
}