import React from "react";
import logo from '../../assets/decare_logo.png'
import { Navbar, Nav, Image, NavDropdown, Spinner } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import { useStore } from '../../context/GlobalState';
import { signOut } from '../../store/actions/authActions';
import { setUserDetails } from '../../store/actions/userActions';
import { v4 as guid } from 'uuid';


export const NavigationBar = () => {
    const [{ auth, user, transactionStates }, dispatch] = useStore();
    const history = useHistory();

    const isTransactionRunning = transactionStates.isTransactionRunning;

    const signOutHandler = () => {
        dispatch(signOut());
        dispatch(setUserDetails(null));
        history.push('/signin');
    }

    let authenticatedNavLinks = [];
    if (auth.isAuthenticated) {
        authenticatedNavLinks = [
            <NavDropdown key={guid()} className='mx-3' title="Campaigns" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/campaigns' href='#all_campaigns'>All Campaigns</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/my_campaigns' href='#my_campaigns'>My Campaigns</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/create_campaign' href='#create_campaign'>Create Campaign</NavDropdown.Item>
            </NavDropdown>,

            <Nav.Link key={guid()} className='mx-3' as={Link} to='/my_donations' href='#my_donations'>My Donations</Nav.Link>,
            <Nav.Link key={guid()} className='mx-3' href='https://github.com/AbdulRafaySiddiqui/decare/' target="_blank">Github</Nav.Link>
        ];
        const spinner = <Spinner animation="grow" variant="light" role="status" />;

        const signOutButton =
            <NavDropdown key={guid()} className='mx-3' alignRight
                title={
                    <Image height='30px' width='30px' roundedCircle src={user.imgUrl ? user.imgUrl : "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"}></Image>
                }
                id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/profile' href='#profile'>Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="" href='#signout' onClick={signOutHandler}>Sign Out</NavDropdown.Item>
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
            <Navbar expand='lg' bg="primary" variant="dark" fixed>
                {/* Home Icon */}
                <Navbar.Brand style={{ fontWeight: 'bold' }} href="/">
                    <Image width="30"
                        height="30"
                        className="d-inline-block align-top" src={logo} /> DeCare
                </Navbar.Brand>

                {/* Toggler */}
                <Navbar.Toggle aria-controls='navbar-items' />
                <Navbar.Collapse id='navbar-items'>

                    <Nav className="ml-auto">
                        {/* Home */}
                        <Nav.Link key={guid()} className='mx-3' as={Link} to='/' href='#home'>Home</Nav.Link>

                        {/* All Campaigns */}
                        {
                            !auth.isAuthenticated &&
                            <Nav.Link key={guid()} className='mx-3' as={Link} to='/campaigns' href='#all_campaigns'>Campaigns</Nav.Link>
                        }

                        {/* Authenticated Links */}
                        {authenticatedNavLinks}
                        {
                            isTransactionRunning &&
                            <Spinner style={{ marginTop: '5px' }} animation="grow" variant="light" role="status" />
                        }
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}