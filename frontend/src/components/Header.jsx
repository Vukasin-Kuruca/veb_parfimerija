import React from 'react'
import { Navbar, Container, Nav, Dropdown, Badge } from 'react-bootstrap'
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar
                expand="md"
                sticky="top"
                collapseOnSelect
                className="shadow-sm py-2"
                style={{
                    background: 'linear-gradient(90deg, #2c1b18, #3b241f)',
                    borderBottom: '2px solid #d4af37'
                }}
            >
                <Container className="d-flex align-items-center">

                    
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="link"
                            style={{
                                color: '#f8e7d1',
                                textDecoration: 'none'
                            }}
                        >
                            <FaBars size={18} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <LinkContainer to="/">
                                <Dropdown.Item>Početna</Dropdown.Item>
                            </LinkContainer>

                            <LinkContainer to="/products">
                                <Dropdown.Item>Parfemi</Dropdown.Item>
                            </LinkContainer>

                            <LinkContainer to="/cart">
                                <Dropdown.Item>Korpa</Dropdown.Item>
                            </LinkContainer>

                            <LinkContainer to="/login">
                                <Dropdown.Item>Prijava</Dropdown.Item>
                            </LinkContainer>
                        </Dropdown.Menu>
                    </Dropdown>

                    
                    <LinkContainer to="/">
                        <Navbar.Brand
                            className="mx-auto fw-bold"
                            style={{
                                color: '#f8e7d1',
                                fontSize: '1.3rem',
                                letterSpacing: '2px'
                            }}
                        >
                            🌸 VEB PARFIMERIJA
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle style={{ background: '#f8e7d1' }} />

                    <Navbar.Collapse>
                        <Nav className="ms-auto d-flex align-items-center gap-3">

                            
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    style={{
                                        color: '#f8e7d1',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <FaShoppingCart />
                                    <Badge bg="light" text="dark" className="ms-1">0</Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu style={{ minWidth: '280px' }}>
                                    <div className="p-3 text-center">
                                        Korpa je prazna
                                    </div>

                                    <Dropdown.Divider />

                                    <LinkContainer to="/cart">
                                        <Dropdown.Item className="text-center">
                                            Idi u korpu
                                        </Dropdown.Item>
                                    </LinkContainer>
                                </Dropdown.Menu>
                            </Dropdown>

                            
                            <LinkContainer to="/login">
                                <Nav.Link style={{ color: '#f8e7d1' }}>
                                    <FaUser className="me-1" />
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