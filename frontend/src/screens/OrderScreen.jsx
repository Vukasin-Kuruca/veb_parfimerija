import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIdQuery, useDeliverOrderMutation } from '../slices/ordersApiSlice.js';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, isError } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadPaypalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'EUR',
                    },
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            }
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPaypalScript();
                } else {
                    paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
                }
            }
        }
    }, [errorPayPal, loadingPayPal, paypal, order, paypalDispatch]);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details }).unwrap();
                refetch();
                toast.success('Porudžbina je uspešno plaćena');
            }
            catch (err) {
                toast.error(err?.data?.message || err.message || 'Greška prilikom plaćanja porudžbine');
            }
        });
    }

    

    function onError(err) {
        toast.error(err?.data?.message || err.message || 'Greška prilikom plaćanja porudžbine');
    }

    function createOrder(data, actions) {
        const totalInEur = (order.totalPrice / 117.2).toFixed(2);
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalInEur,
                    },
                },
            ],
        }).then((orderID) => {
            return orderID;
        });
    }

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId).unwrap();
            refetch();
            toast.success('Porudžbina je označena kao dostavljena');
        }
        catch (err) {
            toast.error(err?.data?.message || err.message || 'Greška prilikom označavanja porudžbine kao dostavljene');
        }
    }

    return isLoading ? (
        <Loader />
    ) : isError ? (
        <Message variant='danger'>Greška prilikom učitavanja porudžbine</Message>
    ) : (
        <>
            <h1>Porudžbina {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Adresa za isporuku</h2>
                            <p>
                                <strong>Ime: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>{' '}
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Adresa: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Dostavljeno datuma: {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='danger'>Nije dostavljeno</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Način plaćanja</h2>
                            <p>
                                <strong>Metod: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Plaćeno datuma: {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Nije plaćeno</Message>
                            )}
                        </ListGroup.Item>
                        <h2>Proizvodi</h2>
                        {order.orderItems.length === 0 ? (
                            <Message>Porudžbina je prazna</Message>
                        ) : (
                            <ListGroup.Item variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x {item.price.toFixed(2)} RSD = {(item.qty * item.price).toFixed(2)} RSD
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Ukupno</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Proizvodi</Col>
                                    <Col>{order.itemsPrice.toFixed(2)} RSD</Col>
                                </Row>

                                <Row>
                                    <Col>Cena dostave</Col>
                                    <Col>{order.shippingPrice.toFixed(2)} RSD</Col>
                                </Row>

                                <Row>
                                    <Col>Pdv</Col>
                                    <Col>{order.taxPrice.toFixed(2)} RSD</Col>
                                </Row>

                                <Row>
                                    <Col>Ukupna cena</Col>
                                    <Col>{order.totalPrice.toFixed(2)} RSD</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {isPending ? <Loader /> : (
                                        <div>
                                            <div>
                                                <PayPalButtons
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                ></PayPalButtons>
                                            </div>
                                        </div>
                                    )}

                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={deliverOrderHandler}>
                                        Označi kao dostavljeno
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;
