import React from 'react'
import { CampaignList } from '../components/CampaignList/CampaignList'

export const Layout = () => {
    return (
        <React.Fragment>
            <div style={{ backgroundColor: '#fff'}}>
                <p>DeCare</p>
                <CampaignList campaigns={[
                    {
                        id: 1, 
                        title: "Lorem Ipsum", 
                        content: "Mauris interdum, tortor et elementum tempus, nisl enim suscipit metus, non lobortis nulla lorem vitae quam. Cras lacinia, massa tempor commodo faucibus, nisi est tempor nisl" ,
                        owner: "DeCare NGO",
                        dateCreated: new Date().toDateString()
                    },
                    {
                        id: 2,
                        title: "Lorem Ipsum",
                        content: "Mauris interdum, tortor et elementum tempus, nisl enim suscipit metus, non lobortis nulla lorem vitae quam. Cras lacinia, massa tempor commodo faucibus, nisi est tempor nisl",
                        owner: "DeCare NGO",
                        dateCreated: new Date().toDateString()
                    },
                    {
                        id: 3,
                        title: "Lorem Ipsum",
                        content: "Mauris interdum, tortor et elementum tempus, nisl enim suscipit metus, non lobortis nulla lorem vitae quam. Cras lacinia, massa tempor commodo faucibus, nisi est tempor nisl",
                        owner: "DeCare NGO",
                        dateCreated: new Date().toDateString()
                    },
                    {
                        id: 4,
                        title: "Lorem Ipsum",
                        content: "Mauris interdum, tortor et elementum tempus, nisl enim suscipit metus, non lobortis nulla lorem vitae quam. Cras lacinia, massa tempor commodo faucibus, nisi est tempor nisl",
                        owner: "DeCare NGO",
                        dateCreated: new Date().toDateString()
                    },
                    {
                        id: 5,
                        title: "Lorem Ipsum",
                        content: "Mauris interdum, tortor et elementum tempus, nisl enim suscipit metus, non lobortis nulla lorem vitae quam. Cras lacinia, massa tempor commodo faucibus, nisi est tempor nisl",
                        owner: "DeCare NGO",
                        dateCreated: new Date().toDateString()
                    },
                     ]
                } />
            </div>
        </React.Fragment>
    );
}