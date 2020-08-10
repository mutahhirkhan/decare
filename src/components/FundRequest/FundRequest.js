import React, { useState } from 'react';
import { LoadingButton } from '../LoadingButton/LoadingButton';
import * as ethService from '../../services/ethereum/ethService';
import { showError } from '../../store/actions/alertAction';
import { useStore } from '../../context/GlobalState';
import { FaPlus, FaMinus, FaChevronCircleRight } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap';

export const FundRequest = ({ data, isManager, address, loadCampaignDetails, donorsCount }) => {
    console.log('donorsCount', donorsCount);
    const [_, dispatch] = useStore();
    const [showDetails, setshowDetails] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isApproving, setIsApproving] = useState(false);

    const processRequest = async (index) => {
        setIsProcessing(true);
        try {
            await ethService.processFundRequest(address, index);
            data = await ethService.getSingleFundRequest(address, data.index);
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
                await ethService.approveFundRequest(address, index);
            } else {
                await ethService.disapproveFundRequest(address, index);
            }
            data = await ethService.getSingleFundRequest(address, data.index);
        }
        catch (e) {
            dispatch(showError(e.message));
        }
        setIsApproving(false);
    }

    return (
        <React.Fragment>
            <tr>
                <td><Button onClick={() => setshowDetails(!showDetails)}> {showDetails ? <FaMinus /> : <FaPlus />} </Button></td>
                <td>{data.description}</td>
                <td>{data.amount}</td>
                <td>{data.recipientsCount}</td>
                <td>{donorsCount - data.disapproversCount}</td>
                <td>{data.disapproversCount}</td>
                <td>{data.createdAt.toDateString()}</td>
                <td>{data.isCompleted ? 'Completed' : 'In progress'}</td>
                {
                    isManager ?
                        <td>{
                            <LoadingButton isloading={isProcessing}
                                size='sm'
                                variant='success'
                                disabled={data.isCompleted}
                                onClick={() => processRequest(data.index)}>{data.isCompleted ? "Completed" : "Process Request"}</LoadingButton>
                        }</td> :
                        <td>{
                            <LoadingButton isloading={isApproving}
                                size='sm'
                                disabled={data.isCompleted}
                                variant={data.isDisapprover ? 'success' : 'danger'}
                                onClick={() => approveRequest(data.index, data.isDisapprover)} >{data.isDisapprover ? "Approve" : "Disapprove"}</LoadingButton>
                        }</td>
                }
            </tr>
            {
                showDetails &&
                data.recipients?.map(r => <tr>
                    <td>
                        <FaChevronCircleRight />
                    </td>
                    <td colSpan='8' style={{ background: '#b8dcff' }}>
                        <Row>
                            <Col md='8'>
                                {/* Recipients Address */}
                                    Recipient: <b>{r.address}</b>
                            </Col>

                            <Col md='4'>
                                {/* Amount */}
                                    Amount Delegated: <b>{r.amount}</b>
                            </Col>
                        </Row>
                    </td>
                </tr>)
            }
        </React.Fragment>
    );
}