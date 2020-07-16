import React from "react";
import { Navbar, Nav, Form, FormControl, Button, Container } from "react-bootstrap";

export const NavigationBar = () => {
    return (
        <Container>
            <Navbar expand='md'>
                <Navbar.Brand>
                    <h1>DeCare</h1>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='navbar-items' />
                <Navbar.Collapse id='navbar-items'>


                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Nav.Link>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>Github</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>About</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}