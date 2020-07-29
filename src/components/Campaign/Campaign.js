import React from 'react';
import classes from './Campaign.module.css'
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import { IconContext } from "react-icons"

export const Campaign = ({ campaign, history }) => {

    return (
        <Link className={classes.Card} to={`/campaign${campaign.address}`}>
            <h1> {campaign.title} </h1>
            <p className={classes.description} > {campaign.description} </p>
            <p className={classes.CreatedBy} > Created By: {campaign.manager} </p>
            <IconContext.Provider value={{ className: classes.DateIcon }}>
                <FaCalendarAlt />  <p className={classes.DateCreated}> {campaign.createdAt.toDateString()}</p>
            </IconContext.Provider>
        </Link>
    );
}
