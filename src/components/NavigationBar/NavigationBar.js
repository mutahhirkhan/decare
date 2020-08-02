import React from "react";
import logo from '../../assets/decare_logo.png'
import { Navbar, Nav, Image, NavDropdown, Spinner } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import { useStore } from '../../context/GlobalState';
import { signOut } from '../../store/actions/authActions';


export const NavigationBar = () => {
    const [{ auth, user }, dispatch] = useStore();
    const history = useHistory();

    const signOutHandler = () => {
        dispatch(signOut());
        history.push('/signin');
    }

    let authenticatedNavLinks = [];
    if (auth.isAuthenticated) {
        authenticatedNavLinks = [
            <NavDropdown className='mx-3' title="Campaigns" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/campaigns' href='#all_campaigns'>All Campaigns</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/my_campaigns' href='#my_campaigns'>My Campaigns</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/create_campaign' href='#create_campaign'>Create Campaign</NavDropdown.Item>
            </NavDropdown>,

            <Nav.Link className='mx-3' as={Link} to='/my_donations' href='#my_donations'>My Donations</Nav.Link>,
            <Nav.Link className='mx-3' as={Link} to='/profile' href='#profile'>Profile</Nav.Link>,
            <Nav.Link className='mx-3' href='https://github.com/AbdulRafaySiddiqui/' target="_blank">Github</Nav.Link>
        ];
        const spinner = <Spinner animation="grow" variant="light" role="status" />;

        const signOutButton =
            <NavDropdown className='mx-3' title={user ? user.name : 'User'} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} href='#signout' onClick={signOutHandler}>Sign Out</NavDropdown.Item>
            </NavDropdown>;

        if (auth.loading) {
            authenticatedNavLinks.push(spinner);
        }
        else {
            authenticatedNavLinks.push(signOutButton);
        }
    }

    return (
        <div>
            <Navbar expand='lg' bg="primary" variant="dark">
                <Navbar.Brand style={{ fontWeight: 'bold' }} href="/">
                    <Image width="30"
                        height="30"
                        className="d-inline-block align-top" src={logo} /> DeCare
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='navbar-items' />
                <Navbar.Collapse id='navbar-items'>

                    <Nav className="ml-auto">
                        <Nav.Link className='mx-3' as={Link} to='/' href='#home'>Home</Nav.Link>
                        {authenticatedNavLinks}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}