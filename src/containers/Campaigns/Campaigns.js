import React from 'react'
import { CampaignList } from '../../components/CampaignList/CampaignList'

export const Campaigns = () => {
    return (
        <div>
            <CampaignList campaigns={[
                {
                    id: 1,
                    title: "Lorem Ipsum",
                    description: "Mauris interdum, tortor et elementum tempus, nisl enim suscipit metus, non lobortis nulla lorem vitae quam. Cras lacinia, massa tempor commodo faucibus, nisi est tempor nisl",
                    createdBy: "DeCare NGO",
                    dateCreated: new Date().toDateString()
                },
                {
                    id: 2,
                    title: "Lorem Ipsum",
                    description: "Mauris interdum, tortor et elementum tempus, nisl enim suscipit metus, non lobortis nulla lorem vitae quam. Cras lacinia, massa tempor commodo faucibus, nisi est tempor nisl",
                    createdBy: "DeCare NGO",
                    dateCreated: new Date().toDateString()
                },
                {
                    id: 3,
                    title: "Lorem Ipsum",
                    description: "Mauris interdum, tortor et elementum tempus, nisl enim suscipit metus, non lobortis nulla lorem vitae quam. Cras lacinia, massa tempor commodo faucibus, nisi est tempor nisl",
                    createdBy: "DeCare NGO",
                    dateCreated: new Date().toDateString()
                },
                {
                    id: 4,
                    title: "Lorem Ipsum",
                    description: "Mauris interdum, tortor et elementum tempus, nisl enim suscipit metus, non lobortis nulla lorem vitae quam. Cras lacinia, massa tempor commodo faucibus, nisi est tempor nisl",
                    createdBy: "DeCare NGO",
                    dateCreated: new Date().toDateString()
                },
                {
                    id: 5,
                    title: "Lorem Ipsum",
                    description: "Mauris interdum, tortor et elementum tempus, nisl enim suscipit metus, non lobortis nulla lorem vitae quam. Cras lacinia, massa tempor commodo faucibus, nisi est tempor nisl",
                    createdBy: "DeCare NGO",
                    dateCreated: new Date().toDateString()
                },
            ]
            }
            >

            </CampaignList>
        </div>

    );
}