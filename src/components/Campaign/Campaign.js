import React from 'react';
import classes from './Campaign.module.css'
import { FaCalendarAlt } from 'react-icons/fa';
import { IconContext } from "react-icons"

export const Campaign = ({ campaign }) => {

    return (
        <a className={classes.Card} >
            <h1> {campaign.title} </h1>
            <p className={classes.Description} > {campaign.description} </p>
            <p className={classes.CreatedBy} > Created By: {campaign.createdBy} </p>
            <IconContext.Provider value={{ className: classes.DateIcon }}>
                <FaCalendarAlt />  <p className={classes.DateCreated}> {campaign.dateCreated}</p> 
            </IconContext.Provider>
        </a>
    );
}