import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';
const CartScreen = () => {
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    return (
        <Row className='mt-4'>
            
            <Col md={8}>
                <h1
                    style={{
                        marginBottom: '25px',
                        color: '#2c1b18',
                        fontWeight: '700',
                        letterSpacing: '1px'
                    }}
                >
                    🛍 Vaša korpa
                </h1>

                {cartItems.length === 0 ? (
                    <Message>
                        Korpa je prazna{' '}
                        <Link to='/'>
                            Vrati se nazad
                        </Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item
                                key={item._id}
                                style={{
                                    borderRadius: '15px',
                                    marginBottom: '15px',
                                    border: '1px solid #eee',
                                    background: '#fffaf7',
                                    boxShadow:
                                        '0 5px 15px rgba(0,0,0,0.05)',
                                    padding: '20px'
                                }}
                            >
                                <Row className='align-items-center'>
                                    <Col md={2}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                            rounded
                                            style={{
                                                height: '90px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </Col>

                                    <Col md={3}>
                                        <Link
                                            to={`/product/${item._id}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#2c1b18',
                                                fontWeight: '600'
                                            }}
                                        >
                                            {item.name}
                                        </Link>
                                    </Col>

                                    <Col
                                        md={2}
                                        style={{
                                            color: '#b8860b',
                                            fontWeight: '700'
                                        }}
                                    >
                                        {item.price.toFixed(2)} RSD
                                    </Col>

                                    <Col md={2}>
                                        <Form.Select
                                            value={item.qty}
                                            onChange={(e) =>
                                                addToCartHandler(
                                                    item,
                                                    Number(e.target.value)
                                                )
                                            }
                                        >
                                            {[...Array(
                                                item.countInStock || 10
                                            ).keys()].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>

                                    <Col md={2}>
                                        <Button
                                            onClick={() =>
                                                removeFromCartHandler(
                                                    item._id
                                                )
                                            }
                                            style={{
                                                background:
                                                    '#fff0f0',
                                                border:
                                                    '1px solid #ffd4d4',
                                                color: '#d9534f'
                                            }}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            
            <Col md={4}>
                <Card
                    style={{
                        borderRadius: '20px',
                        border: 'none',
                        background: '#fffaf7',
                        boxShadow:
                            '0 10px 25px rgba(0,0,0,0.08)'
                    }}
                >
                    <Card.Body>
                        <h3
                            style={{
                                color: '#2c1b18',
                                marginBottom: '20px'
                            }}
                        >
                            Pregled porudžbine
                        </h3>

                        <p
                            style={{
                                color: '#5a4a42'
                            }}
                        >
                            Ukupno proizvoda:{' '}
                            <strong>
                                {cartItems.reduce(
                                    (acc, item) =>
                                        acc + item.qty,
                                    0
                                )}
                            </strong>
                        </p>

                        <h4
                            style={{
                                color: '#b8860b',
                                fontWeight: '700'
                            }}
                        >
                            {cartItems
                                .reduce(
                                    (acc, item) =>
                                        acc +
                                        item.qty *
                                            item.price,
                                    0
                                )
                                .toFixed(2)}{' '}
                            RSD
                        </h4>

                        <Button
                            className='w-100 mt-3'
                            disabled={
                                cartItems.length === 0
                            }
                            style={{
                                background:
                                    'linear-gradient(to right, #b8860b, #d4af37)',
                                border: 'none',
                                padding: '12px',
                                fontWeight: '600',
                                borderRadius: '12px'
                            }}
                        >
                            Nastavi kupovinu
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen