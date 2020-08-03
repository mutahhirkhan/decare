import React from 'react';
import classes from './Campaign.module.css'
import { useHistory } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import { IconContext } from "react-icons"

export const Campaign = ({ campaign }) => {
    const history = useHistory();
    return (
        <div className={classes.Card} onClick={() => history.push(`/campaign${campaign.address}`)}>
            <h2> {campaign.title} </h2>
            <p className={classes.Description} > {campaign.description} </p>
            {/* <p className={classes.CreatedBy} > Manager: {campaign.manager} </p> */}
            <IconContext.Provider value={{ className: classes.DateIcon }}>
                <FaCalendarAlt />  <p className={classes.DateCreated}>Created at: {campaign.createdAt.toDateString()}</p>
            </IconContext.Provider>
        </div>
    );
}