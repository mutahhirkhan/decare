import React, { useState } from 'react';
import { LoadingButton } from '../LoadingButton/LoadingButton';
import * as ethService from '../../services/ethereum/ethService';
import { showError } from '../../store/actions/alertAction';
import { useStore } from '../../context/GlobalState';
import { FaPlus, FaMinus, FaChevronCircleRight, FaTrashAlt } from 'react-icons/fa';
import { Button, Row, Col, Badge } from 'react-bootstrap';
import { RecipientList } from '../RecipientList/RecipientList';

export const FundRequest = ({ data, isManager, loadCampaignDetails, campaign }) => {
    console.log(data);
    const [_, dispatch] = useStore();
    const [showDetails, setshowDetails] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isApproving, setIsApproving] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const canProcessRequest = new Date(parseInt(campaign.fundRequestProcessTime) * 1000).getTime() + data.createdAt.getTime() < new Date().getTime();
    const canProcessIn = milisecToDayHourMin(new Date(parseInt(campaign.fundRequestProcessTime) * 1000).getTime() + data.createdAt.getTime() - new Date().getTime()) + ' to process.';
    //helper method
    function milisecToDayHourMin(t) {
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

    const processRequest = async (index) => {
        setIsProcessing(true);
        try {
            await ethService.processFundRequest(campaign.address, index);
            data = await ethService.getSingleFundRequest(campaign.address, data.index);
        }
        catch (e) {
            dispatch(showError(e.message));
        }
        setIsProcessing(false);
        loadCampaignDetails();
    }

    const approveRequest = async (index, approve) => {
        setIsApproving(true);
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
        setIsApproving(false);
    }

    const closeRequest = async () => {
        setIsClosing(true);
        try {
            await ethService.closeFundRequest(campaign.address, data.index);
        }
        catch (e) {
            dispatch(showError(e.message));
        }
        setIsClosing(false);
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
                            <td>{
                                <LoadingButton isloading={isProcessing}
                                    size='sm'
                                    variant='success'
                                    disabled={data.isCompleted || data.isClosed || !canProcessRequest}
                                    onClick={() => processRequest(data.index)}>{data.isCompleted ? "Completed" : "Process Request"}</LoadingButton>
                            }</td>
                            <td>
                                <LoadingButton isloading={isClosing}
                                    size='sm'
                                    variant='danger'
                                    disabled={data.isClosed}
                                    onClick={closeRequest}><FaTrashAlt /></LoadingButton>
                            </td>
                        </>
                        :
                        <td>{
                            <LoadingButton isloading={isApproving}
                                size='sm'
                                disabled={data.isCompleted || data.isClosed}
                                variant={data.isDisapprover ? 'success' : 'danger'}
                                onClick={() => approveRequest(data.index, data.isDisapprover)} >{data.isDisapprover ? "Approve" : "Disapprove"}</LoadingButton>
                        }</td>
                }
            </tr>
            {
                showDetails &&
                <tr>
                    <td></td>
                    <td colSpan='9'><RecipientList recipients={data.recipients} /></td>
                </tr>
            }
        </React.Fragment>
    );
}