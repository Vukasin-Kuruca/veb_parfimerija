import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate])

    return (
        <FormContainer>
            <div
                style={{
                    maxWidth: '420px',
                    margin: '40px auto',
                    padding: '30px',
                    background: '#fffaf7',
                    borderRadius: '18px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    border: '1px solid #f0e6e0'
                }}
            >
                <h1
                    style={{
                        textAlign: 'center',
                        marginBottom: '25px',
                        color: '#2c1b18',
                        fontWeight: '700',
                        letterSpacing: '1px'
                    }}
                >
                    🌸 Registracija
                </h1>

                <Form>
                    <Form.Group controlId="name" className="my-3">
                        <Form.Label style={{ color: '#5a4a42', fontWeight: '500' }}>
                            Ime
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Unesite ime"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                borderRadius: '10px',
                                padding: '10px',
                                border: '1px solid #e6d5cc',
                                boxShadow: 'none'
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="email" className="my-3">
                        <Form.Label style={{ color: '#5a4a42', fontWeight: '500' }}>
                            Email
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Unesite email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                borderRadius: '10px',
                                padding: '10px',
                                border: '1px solid #e6d5cc',
                                boxShadow: 'none'
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="password" className="my-3">
                        <Form.Label style={{ color: '#5a4a42', fontWeight: '500' }}>
                            Lozinka
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Unesite lozinku"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                borderRadius: '10px',
                                padding: '10px',
                                border: '1px solid #e6d5cc',
                                boxShadow: 'none'
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword" className="my-3">
                        <Form.Label style={{ color: '#5a4a42', fontWeight: '500' }}>
                            Potvrdite lozinku
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Potvrdite lozinku"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{
                                borderRadius: '10px',
                                padding: '10px',
                                border: '1px solid #e6d5cc',
                                boxShadow: 'none'
                            }}
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        className="w-100 mt-3"
                        disabled={isLoading}
                        style={{
                            background: 'linear-gradient(to right, #b8860b, #d4af37)',
                            border: 'none',
                            padding: '12px',
                            fontWeight: '600',
                            borderRadius: '12px',
                            letterSpacing: '1px'
                        }}
                    >
                        Registruj se
                    </Button>

                    {isLoading && <Loader />}
                </Form>

                <Row className="py-3">
                    <Col className="text-center">
                        <span style={{ color: '#5a4a42' }}>
                            Imate nalog?
                        </span>{' '}
                        <Link
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}
                            style={{
                                color: '#b8860b',
                                fontWeight: '600',
                                textDecoration: 'none'
                            }}
                        >
                            Prijavite se
                        </Link>
                    </Col>
                </Row>
            </div>
        </FormContainer>
    )
}

export default RegisterScreen