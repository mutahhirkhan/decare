import React from 'react';
import classes from './Campaign.module.css'
import { FaCalendarAlt } from 'react-icons/fa';
import { IconContext } from "react-icons"

export const Campaign = ({ campaignData }) => {

    return (
        <a className={classes.Card} >
            <h1> {campaignData.title} </h1>
            <p className={classes.Content} > {campaignData.content} </p>
            <p className={classes.Owner} > Created By: {campaignData.owner} </p>
            <IconContext.Provider value={{ className: classes.DateIcon }}>
                <FaCalendarAlt />  <p className={classes.DateCreated}> {campaignData.dateCreated}</p> 
            </IconContext.Provider>
        </a>
    );
}