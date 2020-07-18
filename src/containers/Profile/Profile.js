import React from 'react';
import { ProfileDetails } from '../../components/ProfileDetails/ProfileDetails';
import { Container } from 'react-bootstrap'

export const Profile = () => {
    return (
        <Container>
            <ProfileDetails />
        </Container>
    );
}