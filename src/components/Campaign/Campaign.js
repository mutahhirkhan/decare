import React from 'react';
import classes from './Campaign.module.css'
import { useHistory } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { Badge } from 'react-bootstrap';

export const Campaign = ({ campaign }) => {
    const history = useHistory();
    return (
        <div className={classes.Card} onClick={() => history.push(`/campaign/${campaign.address}`)}>
            {/* Title */}
            <h2> {campaign.title} </h2>

            {/* Status */}
            <Badge style={{ marginTop: '10px', marginLeft: '10px' }} variant={campaign.status === 'Closed' ? 'danger' : campaign.status === 'Goal Pending' ? 'warning' : 'success'}>{campaign.status}</Badge>

            {/* Description */}
            <p className={classes.Description} > {campaign.description} </p>

            <IconContext.Provider value={{ className: classes.DateIcon }}>
                <FaCalendarAlt />  <p className={classes.DateCreated}>Created at: {campaign.createdAt.toDateString()}</p>
            </IconContext.Provider>
        </div>
    );
}