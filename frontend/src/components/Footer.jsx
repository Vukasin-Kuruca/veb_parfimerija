import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    const [email, setEmail] = useState('')

    const subscribeHandler = (e) => {
        e.preventDefault()
        if (email.trim()) {
            toast.success('Hvala na prijavi! Pratite svoj inbox za ekskluzivne ponude.')
            setEmail('')
        }
    }

    return (
        <footer
            style={{
                background: 'linear-gradient(to right, #2c1b18, #1a0f0e)',
                color: '#f8e7d1',
                marginTop: '40px',
                borderTop: '2px solid #d4af37'
            }}
        >
            <Container className="py-4">
                <Row className="gy-4">
                    <Col md={4}>
                        <h5 style={{ letterSpacing: '2px' }}>🌸 VEB PARFIMERIJA</h5>
                        <p style={{ color: '#d4af37', fontSize: '0.9rem' }}>
                            Mirisi koji ostaju u sećanju
                        </p>
                        <div className="d-flex gap-3 fs-5">
                            <a href="#" style={{ color: '#f8e7d1' }}><FaFacebook /></a>
                            <a href="#" style={{ color: '#f8e7d1' }}><FaInstagram /></a>
                            <a href="#" style={{ color: '#f8e7d1' }}><FaTiktok /></a>
                        </div>
                    </Col>

                    <Col md={4}>
                        <h6 style={{ color: '#d4af37', letterSpacing: '1px' }}>Kategorije</h6>
                        <ul className="list-unstyled" style={{ fontSize: '0.9rem' }}>
                            <li className="mb-2"><Link to="/?category=Muški parfemi" style={{ color: '#f8e7d1', textDecoration: 'none' }}>Muški parfemi</Link></li>
                            <li className="mb-2"><Link to="/?category=Ženski parfemi" style={{ color: '#f8e7d1', textDecoration: 'none' }}>Ženski parfemi</Link></li>
                            <li className="mb-2"><Link to="/?category=Uniseks parfemi" style={{ color: '#f8e7d1', textDecoration: 'none' }}>Uniseks parfemi</Link></li>
                        </ul>
                    </Col>

                    <Col md={4}>
                        <h6 style={{ color: '#d4af37', letterSpacing: '1px' }}>Prijavite se za novosti</h6>
                        <p style={{ fontSize: '0.85rem', color: '#e6d5cc' }}>
                            Budite prvi koji čuje za nove mirise i ekskluzivne popuste.
                        </p>
                        <Form className="d-flex gap-2" onSubmit={subscribeHandler}>
                            <Form.Control
                                type="email"
                                placeholder="Vaš email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    background: 'rgba(248,231,209,0.1)',
                                    color: '#f8e7d1',
                                    border: '1px solid #d4af37'
                                }}
                            />
                            <Button
                                type="submit"
                                style={{
                                    background: 'linear-gradient(to right, #b8860b, #d4af37)',
                                    border: 'none',
                                    color: '#2c1b18',
                                    fontWeight: '600'
                                }}
                            >
                                Pošalji
                            </Button>
                        </Form>
                    </Col>
                </Row>

                <hr style={{ borderColor: '#4a2f29' }} />

                <Row>
                    <Col
                        className="text-center"
                        style={{
                            fontSize: '0.9rem',
                            letterSpacing: '0.5px'
                        }}
                    >
                        <p style={{ margin: 0 }}>
                            🌸 &copy; {currentYear} <strong>Veb Parfimerija</strong>. Sva prava zadržana.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer