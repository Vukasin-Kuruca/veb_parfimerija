import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { userInfo } = useSelector((state) => state.auth);
    const { data: orders = [], isLoading, error } = useGetMyOrdersQuery();

    const [updateProfile, { isLoading: loadingUpdateProfile }] =
        useProfileMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name || '');
            setEmail(userInfo.email || '');
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Lozinke se ne poklapaju');
            return;
        }

        try {
            const res = await updateProfile({
                _id: userInfo._id,
                name,
                email,
                password,
            }).unwrap();

            dispatch(setCredentials({ ...res }));
            toast.success('Profil je uspešno ažuriran');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <Row>
            
            <Col md={3}>
                <h3 className="mb-3">Moj profil</h3>

                <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId="name">
                        <Form.Label>Ime i prezime</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Unesite ime i prezime"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="email">
                        <Form.Label>E-mail adresa</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Unesite e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="password">
                        <Form.Label>Nova lozinka</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Unesite novu lozinku"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="my-2" controlId="confirmPassword">
                        <Form.Label>Potvrda lozinke</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ponovite lozinku"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="dark"
                        className="w-100 mt-2"
                        disabled={loadingUpdateProfile}
                    >
                        Ažuriraj profil
                    </Button>
                </Form>
            </Col>

            {/* PORUDŽBINE */}
            <Col md={9}>
                <h3 className="mb-3">Moje porudžbine</h3>

                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">
                        {error?.data?.message || error.error}
                    </Message>
                ) : (
                    <Table striped hover responsive className="table-sm align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Datum</th>
                                <th>Ukupno</th>
                                <th>Plaćanje</th>
                                <th>Dostava</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>

                                    <td>
                                        {order.createdAt?.substring(0, 10)}
                                    </td>

                                    <td>{order.totalPrice} RSD</td>

                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt?.substring(0, 10)
                                        ) : (
                                            <FaTimes style={{ color: 'red' }} />
                                        )}
                                    </td>

                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt?.substring(0, 10)
                                        ) : (
                                            <FaTimes style={{ color: 'red' }} />
                                        )}
                                    </td>

                                    <td>
                                        <LinkContainer
                                            to={`/order/${order._id}`}
                                        >
                                            <Button
                                                variant="outline-dark"
                                                size="sm"
                                            >
                                                Detalji
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default ProfileScreen;