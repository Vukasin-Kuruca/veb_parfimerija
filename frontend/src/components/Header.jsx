import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { Dropdown, Badge } from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar
                expand="md"
                collapseOnSelect
                className="shadow-sm py-3"
                style={{
                    background: 'linear-gradient(to right, #2c1b18, #4a2c2a)',
                    borderBottom: '2px solid #d4af37'
                }}
            >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand
                            className="fw-bold d-flex align-items-center"
                            style={{
                                color: '#f8e7d1',
                                fontSize: '1.4rem',
                                letterSpacing: '1px'
                            }}
                        >
                            🌸
                            <span className="ms-2">
                                VEB PARFIMERIJA
                            </span>
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        style={{
                            backgroundColor: '#f8e7d1'
                        }}
                    />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link
                                    style={{
                                        color: '#f8e7d1',
                                        fontWeight: '500',
                                        marginRight: '10px'
                                    }}
                                >
                                    <FaShoppingCart className="me-2" />
                                    Korpa
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/login">
                                <Nav.Link
                                    style={{
                                        color: '#f8e7d1',
                                        fontWeight: '500'
                                    }}
                                >
                                    <FaUser className="me-2" />
                                    Prijava
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
        
    )

    
}

export default Header