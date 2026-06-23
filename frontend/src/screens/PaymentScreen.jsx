import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer.jsx';
import CheckoutSteps from '../components/CheckoutSteps.jsx';
import { savePaymentMethod } from '../slices/cartSlice.js';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <div style={{
                background: '#fffaf7',
                borderRadius: '20px',
                padding: '40px 36px',
                boxShadow: '0 12px 40px rgba(44, 27, 24, 0.1)',
                border: '1px solid #f0e6e0',
                margin: '24px 0 40px'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <span style={{ fontSize: '2.6rem', display: 'block', marginBottom: '10px' }}>
                        💳
                    </span>
                    <h1 style={{
                        fontSize: '1.7rem',
                        fontWeight: '700',
                        color: '#2c1b18',
                        letterSpacing: '1px',
                        marginBottom: '8px'
                    }}>
                        Način plaćanja
                    </h1>
                    <p style={{ color: '#7a5c54', fontSize: '0.92rem', marginBottom: '0' }}>
                        Odaberite kako želite da platite vašu porudžbinu.
                    </p>
                    <div style={{
                        width: '60px',
                        height: '3px',
                        background: 'linear-gradient(to right, #b8860b, #d4af37)',
                        margin: '16px auto 0',
                        borderRadius: '2px'
                    }} />
                </div>

                <Form onSubmit={submitHandler}>
                    <Form.Group style={{ marginBottom: '24px' }}>
                        <Form.Label
                            as='legend'
                            style={{
                                fontWeight: '600',
                                fontSize: '0.88rem',
                                color: '#5a4a42',
                                letterSpacing: '0.4px',
                                marginBottom: '14px'
                            }}
                        >
                            Odaberite način plaćanja
                        </Form.Label>
                        <Col>
                            <div style={{
                                background: '#fff',
                                border: '1.5px solid #d4af37',
                                borderRadius: '12px',
                                padding: '16px 20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                cursor: 'pointer'
                            }}>
                                <Form.Check
                                    type='radio'
                                    id='PayPal'
                                    name='paymentMethod'
                                    value='PayPal'
                                    checked={paymentMethod === 'PayPal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{ accentColor: '#b8860b' }}
                                />
                                <label
                                    htmlFor='PayPal'
                                    style={{
                                        color: '#2c1b18',
                                        fontWeight: '600',
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        marginBottom: '0'
                                    }}
                                >
                                    💰 PayPal ili Kreditna kartica
                                </label>
                            </div>
                        </Col>
                    </Form.Group>

                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        background: 'linear-gradient(135deg, #fef9f0, #fffaf7)',
                        border: '1px solid #f0d9a8',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        marginBottom: '24px',
                        fontSize: '0.88rem',
                        color: '#5a4a42'
                    }}>
                        <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '1px' }}>🔒</span>
                        <p style={{ margin: '0', lineHeight: '1.5' }}>
                            Vaše plaćanje je <strong style={{ color: '#b8860b' }}>sigurno i šifrovano</strong>.
                            Podaci o kartici se ne čuvaju na našim serverima.
                        </p>
                    </div>

                    <Button
                        type='submit'
                        style={{
                            width: '100%',
                            padding: '13px',
                            background: 'linear-gradient(to right, #b8860b, #d4af37)',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: '700',
                            fontSize: '1rem',
                            letterSpacing: '0.8px',
                            color: '#fff',
                            boxShadow: '0 4px 14px rgba(184, 134, 11, 0.35)',
                            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(184, 134, 11, 0.45)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 14px rgba(184, 134, 11, 0.35)';
                        }}
                    >
                        Nastavite na pregled porudžbine →
                    </Button>
                </Form>
            </div>
        </FormContainer>
    );
}

export default PaymentScreen;