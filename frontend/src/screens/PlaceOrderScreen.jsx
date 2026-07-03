import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err) {
            toast.error(err?.data?.message || 'Došlo je do greške');
        }
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />

            <Row className='mt-2'>
                
                <Col md={8}>
                    <div style={{
                        background: '#fffaf7',
                        borderRadius: '20px',
                        padding: '30px',
                        boxShadow: '0 12px 40px rgba(44, 27, 24, 0.08)',
                        border: '1px solid #f0e6e0',
                        marginBottom: '20px'
                    }}>

                        
                        <div style={{ marginBottom: '28px' }}>
                            <h2 style={{
                                color: '#2c1b18',
                                fontWeight: '700',
                                fontSize: '1.1rem',
                                letterSpacing: '0.5px',
                                marginBottom: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                🚚 Podaci za dostavu
                            </h2>
                            <p style={{
                                color: '#5a4a42',
                                marginBottom: '0',
                                fontSize: '0.95rem'
                            }}>
                                <strong>Adresa: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </div>

                        <hr style={{ borderColor: '#f0e6e0' }} />

                        
                        <div style={{ marginBottom: '28px', marginTop: '28px' }}>
                            <h2 style={{
                                color: '#2c1b18',
                                fontWeight: '700',
                                fontSize: '1.1rem',
                                letterSpacing: '0.5px',
                                marginBottom: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                💳 Način plaćanja
                            </h2>
                            <p style={{ color: '#5a4a42', marginBottom: '0', fontSize: '0.95rem' }}>
                                {cart.paymentMethod}
                            </p>
                        </div>

                        <hr style={{ borderColor: '#f0e6e0' }} />

                        
                        <div style={{ marginTop: '28px' }}>
                            <h2 style={{
                                color: '#2c1b18',
                                fontWeight: '700',
                                fontSize: '1.1rem',
                                letterSpacing: '0.5px',
                                marginBottom: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                🌸 Stavke porudžbine
                            </h2>

                            {cart.cartItems.length === 0 ? (
                                <Message>Korpa je prazna</Message>
                            ) : (
                                cart.cartItems.map((item, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '16px',
                                            padding: '12px 0',
                                            borderBottom: index < cart.cartItems.length - 1
                                                ? '1px solid #f0e6e0'
                                                : 'none'
                                        }}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                objectFit: 'cover',
                                                borderRadius: '10px'
                                            }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <Link
                                                to={`/product/${item.product}`}
                                                style={{
                                                    color: '#2c1b18',
                                                    fontWeight: '600',
                                                    textDecoration: 'none',
                                                    fontSize: '0.95rem'
                                                }}
                                            >
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div style={{
                                            color: '#b8860b',
                                            fontWeight: '700',
                                            fontSize: '0.9rem',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {item.qty} x {item.price} RSD = {item.qty * item.price} RSD
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </Col>

                
                <Col md={4}>
                    <div style={{
                        background: '#fffaf7',
                        borderRadius: '20px',
                        padding: '28px',
                        boxShadow: '0 12px 40px rgba(44, 27, 24, 0.08)',
                        border: '1px solid #f0e6e0',
                        position: 'sticky',
                        top: '20px'
                    }}>
                        <h2 style={{
                            color: '#2c1b18',
                            fontWeight: '700',
                            fontSize: '1.2rem',
                            marginBottom: '20px',
                            letterSpacing: '0.5px'
                        }}>
                            Rezime porudžbine
                        </h2>

                        {[
                            { label: 'Stavke', value: cart.itemsPrice },
                            { label: 'Dostava', value: cart.shippingPrice },
                            { label: 'PDV', value: cart.taxPrice },
                        ].map((row, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '10px',
                                    color: '#5a4a42',
                                    fontSize: '0.95rem'
                                }}
                            >
                                <span>{row.label}</span>
                                <span>{row.value} RSD</span>
                            </div>
                        ))}

                        <hr style={{ borderColor: '#f0e6e0', margin: '16px 0' }} />

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '24px'
                        }}>
                            <span style={{
                                color: '#2c1b18',
                                fontWeight: '700',
                                fontSize: '1.05rem'
                            }}>
                                Ukupno
                            </span>
                            <span style={{
                                color: '#b8860b',
                                fontWeight: '700',
                                fontSize: '1.1rem'
                            }}>
                                {cart.totalPrice} RSD
                            </span>
                        </div>

                        {error && (
                            <Message variant='danger'>
                                {error?.data?.message || 'Došlo je do greške'}
                            </Message>
                        )}

                        <Button
                            type='button'
                            disabled={cart.cartItems.length === 0}
                            onClick={placeOrderHandler}
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
                            }}
                        >
                            Poručite sada ✓
                        </Button>

                        {isLoading && <Loader />}
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;