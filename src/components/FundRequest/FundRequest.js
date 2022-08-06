import React, { useState, useEffect } from 'react';
import { LoadingButton } from '../LoadingButton/LoadingButton';
import * as ethService from '../../services/ethereum/ethService';
import { showError } from '../../store/actions/alertAction';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';
import { Button, Badge } from 'react-bootstrap';
import { RecipientList } from '../RecipientList/RecipientList';
import { useStore } from '../../context/GlobalState';
import { addTransactionState, setTransactionState } from '../../store/actions/transactionStatesActions';

export const FundRequest = ({ data, isManager, loadCampaignDetails, campaign }) => {
    const processKey = `FUND_REQUEST_PROCESS_${campaign.address}_${data.index}`;
    const closeKey = `FUND_REQUEST_CLOSE_${campaign.address}_${data.index}`;

    const [{ transactionStates, appState:{currentNetwork} } , dispatch ] = useStore();
    const isProcessing = transactionStates[processKey];
    const isClosing = transactionStates[closeKey];

    const [showDetails, setshowDetails] = useState(false);

    useEffect(() => {
        dispatch(addTransactionState(processKey));
        dispatch(addTransactionState(closeKey));
    }, [])

    const canProcessRequest = new Date(parseInt(campaign.fundRequestProcessTime) * 1000).getTime() + data.createdAt.getTime() < new Date().getTime();
    const canProcessIn = milisecToDayHourMin(new Date(parseInt(campaign.fundRequestProcessTime) * 1000).getTime() + data.createdAt.getTime() - new Date().getTime()) + ' to process.';
    //helper method
    function milisecToDayHourMin(t) {
        if (t > 0) {

            var cd = 24 * 60 * 60 * 1000,
                ch = 60 * 60 * 1000,
                d = Math.floor(t / cd),
                h = Math.floor((t - d * cd) / ch),
                m = Math.round((t - d * cd - h * ch) / 60000),
                pad = function (n) { return n < 10 ? '0' + n : n; };
            if (m === 60) {
                h++;
                m = 0;
            }
            if (h === 24) {
                d++;
                h = 0;
            }
            return `${d} Days : ${pad(h)} Hours : ${pad(m)} Minutes`;
        }
        return 'Days: 0 Hours: 0 Minutes: 0';
    }

    const processRequest = async (index) => {
        dispatch(setTransactionState(true, processKey));
        try {
            await ethService.processFundRequest(campaign.address, index);
            data = await ethService.getSingleFundRequest(campaign.address, data.index);
        }
        catch (e) {
            dispatch(showError(e.message));
        }
        dispatch(setTransactionState(false, processKey));
        loadCampaignDetails();
    }

    const approveRequest = async (index, approve) => {
        dispatch(setTransactionState(true, processKey));
        try {
            if (approve) {
                await ethService.approveFundRequest(campaign.address, index);
            } else {
                await ethService.disapproveFundRequest(campaign.address, index);
            }
            data = await ethService.getSingleFundRequest(campaign.address, data.index);
        }
        catch (e) {
            dispatch(showError(e.message));
        }
        dispatch(setTransactionState(false, processKey));
        loadCampaignDetails();
    }

    const closeRequest = async () => {
        dispatch(setTransactionState(true, closeKey));
        try {
            await ethService.closeFundRequest(campaign.address, data.index);
        }
        catch (e) {
            dispatch(showError(e.message));
        }
        dispatch(setTransactionState(false, closeKey));
        loadCampaignDetails();
    }

    return (
        <React.Fragment>
            <tr>
                <td><Button size='sm' onClick={() => setshowDetails(!showDetails)}> {showDetails ? <FaMinus /> : <FaPlus />} </Button></td>
                <td>{data.description}</td>
                <td>{data.amount}</td>
                <td>{data.recipientsCount}</td>
                <td><Badge variant='success'>{campaign.donorsCount - data.disapproversCount}</Badge></td>
                <td><Badge variant='danger'>{data.disapproversCount}</Badge></td>
                <td>{data.createdAt.toDateString()}</td>
                <td>{data.isCompleted ? 'Completed' : data.isClosed ? 'Closed' : canProcessIn}</td>
                {
                    isManager ?
                        <>
                            {/* Process Request */}
                            <td>{
                                <LoadingButton isloading={isProcessing}
                                    size='sm'
                                    variant='success'
                                    disabled={data.isCompleted || data.isClosed || !canProcessRequest}
                                    onClick={() => processRequest(data.index)}>{data.isCompleted ? "Completed" : data.isClosed ? "Closed" : "Process Request"}</LoadingButton>
                            }</td>
                            <td>
                                <LoadingButton isloading={isClosing}
                                    size='sm'
                                    variant='danger'
                                    disabled={data.isClosed || data.isCompleted}
                                    onClick={closeRequest}><FaTrashAlt /></LoadingButton>
                            </td>
                        </>
                        // Approve/Disapprove
                        :
                        <td>{
                            <LoadingButton isloading={isProcessing}
                                size='sm'
                                disabled={data.isCompleted || data.isClosed || !campaign.isDonor}
                                variant={data.isDisapprover ? 'success' : 'danger'}
                                onClick={() => approveRequest(data.index, data.isDisapprover)} >{data.isDisapprover ? "Approve" : "Disapprove"}</LoadingButton>
                        }</td>
                }
            </tr>
            {
                showDetails &&
                <tr>
                    <td></td>
                    <td colSpan='9'><RecipientList recipients={data.recipients} network={currentNetwork} /></td>
                </tr>
            }
        </React.Fragment>
    );
}