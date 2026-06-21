import React, { useState } from 'react'
import { Navbar, Container, Nav, Dropdown, Badge, Form } from 'react-bootstrap'
import { FaShoppingCart, FaUser, FaBars, FaSearch, FaHeart, FaTrash } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../slices/cartSlice'
import { removeFromWishlist } from '../slices/wishlistSlice'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('')

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const wishlist = useSelector((state) => state.wishlist)
    const { wishlistItems } = wishlist

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0)

    const { userInfo } = useSelector((state) => state.auth)

    const submitHandler = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`)
        } else {
            navigate('/')
        }
    }

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
                {userInfo && userInfo.isAdmin && (
                <LinkContainer to="/admin">
                <Nav.Link>Admin</Nav.Link>
                </LinkContainer>
)}
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
                            <LinkContainer to={{pathname: "/", search: "?category=Muški parfemi"}}>
                        <Dropdown.Item>Muški parfemi</Dropdown.Item>
                        </LinkContainer>

                        <LinkContainer to={{pathname: "/",search: "?category=Ženski parfemi"}}>
                        <Dropdown.Item>Ženski parfemi</Dropdown.Item>
                        </LinkContainer>

                        <LinkContainer to={{pathname: "/",search: "?category=Uniseks parfemi"}}>
                        <Dropdown.Item>Uniseks parfemi</Dropdown.Item>
                        </LinkContainer>

                        <LinkContainer to="/guide">
                        <Dropdown.Item>Vodič</Dropdown.Item>
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
                        <Form className="d-flex mx-auto my-2 my-md-0" style={{ maxWidth: '420px', width: '100%' }} onSubmit={submitHandler}>
                            <Form.Control
                                type="text"
                                placeholder="Pretraži parfeme..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="me-2"
                                style={{
                                    background: 'rgba(248,231,209,0.1)',
                                    color: '#f8e7d1',
                                    border: '1px solid #d4af37'
                                }}
                            />
                            <button
                                type="submit"
                                className="btn"
                                style={{
                                    background: 'linear-gradient(to right, #b8860b, #d4af37)',
                                    border: 'none',
                                    color: '#2c1b18'
                                }}
                            >
                                <FaSearch />
                            </button>
                        </Form>

                        <Nav className="ms-auto d-flex align-items-center gap-3">

                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    style={{
                                        color: '#f8e7d1',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <FaHeart />
                                    <Badge bg="light" text="dark" className="ms-1">{wishlistItems.length}</Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu style={{ minWidth: '280px' }}>
                                    {wishlistItems.length === 0 ? (
                                        <div className="p-3 text-center">
                                            Lista želja je prazna
                                        </div>
                                    ) : (
                                        wishlistItems.map((item) => (
                                            <div
                                                key={item._id}
                                                className="d-flex justify-content-between align-items-center px-3 py-2"
                                            >
                                                <LinkContainer to={`/product/${item._id}`}>
                                                    <span style={{ cursor: 'pointer', color: '#2c1b18' }}>
                                                        {item.name}
                                                    </span>
                                                </LinkContainer>
                                                <FaTrash
                                                    style={{ cursor: 'pointer', color: '#d9534f' }}
                                                    onClick={() => dispatch(removeFromWishlist(item._id))}
                                                />
                                            </div>
                                        ))
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    style={{
                                        color: '#f8e7d1',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <FaShoppingCart />
                                    <Badge bg="light" text="dark" className="ms-1">{cartCount}</Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu style={{ minWidth: '300px' }}>
                                    {cartItems.length === 0 ? (
                                        <div className="p-3 text-center">
                                            Korpa je prazna
                                        </div>
                                    ) : (
                                        <>
                                            {cartItems.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="d-flex justify-content-between align-items-center px-3 py-2"
                                                >
                                                    <LinkContainer to={`/product/${item._id}`}>
                                                        <span style={{ cursor: 'pointer', color: '#2c1b18' }}>
                                                            {item.qty} x {item.name}
                                                        </span>
                                                    </LinkContainer>
                                                    <FaTrash
                                                        style={{ cursor: 'pointer', color: '#d9534f' }}
                                                        onClick={() => dispatch(removeFromCart(item._id))}
                                                    />
                                                </div>
                                            ))}
                                            <Dropdown.Divider />
                                        </>
                                    )}

                                    <LinkContainer to="/cart">
                                        <Dropdown.Item className="text-center fw-bold">
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
