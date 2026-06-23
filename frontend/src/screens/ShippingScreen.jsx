import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />

            <div className="shipping-card">
                <div className="shipping-header">
                    <span className="shipping-icon">🚚</span>
                    <h1 className="shipping-title">Podaci o dostavi</h1>
                    <p className="shipping-subtitle">
                        Unesite adresu na koju želite da vam dostavimo porudžbinu.
                    </p>
                </div>

                <Form onSubmit={submitHandler} className="shipping-form">

                    <Form.Group controlId="address" className="shipping-group">
                        <Form.Label className="shipping-label">
                            <span className="shipping-label-icon">📍</span> Adresa
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Npr. Bulevar Oslobođenja 12"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                            className="shipping-input"
                        />
                    </Form.Group>

                    <div className="shipping-row">
                        <Form.Group controlId="city" className="shipping-group">
                            <Form.Label className="shipping-label">
                                <span className="shipping-label-icon">🏙️</span> Grad
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Npr. Novi Sad"
                                value={city}
                                required
                                onChange={(e) => setCity(e.target.value)}
                                className="shipping-input"
                            />
                        </Form.Group>

                        <Form.Group controlId="postalCode" className="shipping-group">
                            <Form.Label className="shipping-label">
                                <span className="shipping-label-icon">🔢</span> Poštanski broj
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Npr. 21000"
                                value={postalCode}
                                required
                                onChange={(e) => setPostalCode(e.target.value)}
                                className="shipping-input"
                            />
                        </Form.Group>
                    </div>

                    <Form.Group controlId="country" className="shipping-group">
                        <Form.Label className="shipping-label">
                            <span className="shipping-label-icon">🌍</span> Država
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Npr. Srbija"
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                            className="shipping-input"
                        />
                    </Form.Group>

                    <div className="shipping-info-box">
                        <span>🕐</span>
                        <p>
                            Isporuka u roku od <strong>2–4 radna dana</strong>.
                            Besplatna dostava za porudžbine preko <strong>5.000 RSD</strong>.
                        </p>
                    </div>

                    <Button type="submit" className="shipping-btn">
                        Nastavi na plaćanje →
                    </Button>
                </Form>
            </div>
        </FormContainer>
    );
};

export default ShippingScreen;