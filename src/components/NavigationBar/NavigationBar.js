import React from "react";
import logo from '../../assets/decare_logo.png'
import { Navbar, Nav, Image, NavDropdown, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useStore } from '../../context/GlobalState';
import { signOut } from '../../store/actions/authActions';


export const NavigationBar = () => {
    const [{ auth }, dispatch] = useStore();

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
                        <NavDropdown className='mx-3' title="Campaigns" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to='/campaigns' href='#all_campaigns'>All Campaigns</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/my_campaigns' href='#my_campaigns'>My Campaigns</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/create_campaign' href='#create_campaign'>Create Campaign</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link className='mx-3' as={Link} to='/my_donations' href='#my_donations'>My Donations</Nav.Link>
                        <Nav.Link className='mx-3' as={Link} to='/profile' href='#profile'>Profile</Nav.Link>
                        <Nav.Link className='mx-3' href='https://github.com/AbdulRafaySiddiqui/' target="_blank">Github</Nav.Link>
                        {/* <Nav.Link className='mx-3' as={Link} to='/about'>About</Nav.Link> */}
                        {
                            auth.loading ? <Spinner animation="grow" variant="light" role="status" /> :
                                <Nav.Link className='mx-3' as={Link} onClick={dispatch(signOut())} to='/signin'>Sign Out</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}