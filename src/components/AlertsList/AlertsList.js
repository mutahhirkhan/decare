import React from 'react';
import { useStore } from '../../context/GlobalState';
import { Alert } from './Alert';

export const AlertsList = () => {
    const [{ alertList }] = useStore();
    return (
        <div
            style={{
                position: 'absolute',
                top: '70px',
                right: '0',
                zIndex: '2000'
            }}
        >
            {
                alertList &&
                alertList.map(a => {
                    if (a.wasShown) {
                        return null;
                    }
                    return (<Alert key={a.id} {...a} />)
                })
            }
        </div>
    );
}