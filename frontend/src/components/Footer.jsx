import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer
            style={{
                background: 'linear-gradient(to right, #2c1b18, #1a0f0e)',
                color: '#f8e7d1',
                marginTop: '40px',
                borderTop: '2px solid #d4af37'
            }}
        >
            <Container>
                <Row>
                    <Col
                        className="text-center py-4"
                        style={{
                            fontSize: '0.95rem',
                            letterSpacing: '0.5px'
                        }}
                    >
                        <p style={{ margin: 0 }}>
                            🌸 &copy; {currentYear} <strong>Veb Parfimerija</strong>. Sva prava zadržana.
                        </p>

                        <small style={{ color: '#d4af37' }}>
                            Mirisi koji ostaju u sećanju ✨
                        </small>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer