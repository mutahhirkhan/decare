import React from "react";
import logo from '../../assets/decare_logo.png'
import { Navbar, Nav, Image } from "react-bootstrap";

export const NavigationBar = () => {
    return (
        <div>
            <Navbar expand='md' bg="primary" variant="dark">
                <Navbar.Brand style={{fontWeight: 'bold'}}>
                    <Image width="30"
                        height="30"
                        className="d-inline-block align-top" src={logo} /> DeCare
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='navbar-items' />
                <Navbar.Collapse id='navbar-items'>


                    <Nav className="ml-auto">
                        <Nav.Item className='mx-3'>
                            <Nav.Link>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='mx-3'>
                            <Nav.Link>Campaigns</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='mx-3'>
                            <Nav.Link>My Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='mx-3'>
                            <Nav.Link>Github</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='mx-3'>
                            <Nav.Link>About</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}