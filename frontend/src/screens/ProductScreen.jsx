import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, Card, Button, Badge, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import Rating from "../components/Rating";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductDetailsQuery, useGetProductsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import { toggleWishlistItem } from "../slices/wishlistSlice";

const ProductScreen = () => {
    const { id: productId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    const [qty, setQty] = useState(1)

    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems)
    const isWished = product && wishlistItems.some((x) => x._id === product._id)

    const { data: sameCategoryProducts } = useGetProductsQuery(
        { category: product?.category },
        { skip: !product }
    )

    const relatedProducts = (sameCategoryProducts || [])
        .filter((p) => p._id !== productId)
        .slice(0, 4)

    if (isLoading) {
        return <Loader />
    }

    if (error || !product) {
        return (
            <>
                <Link className='btn btn-outline-secondary mb-4' to='/'>Nazad</Link>
                <Message variant="danger">
                    {error?.data?.message || error?.error || 'Proizvod nije pronađen.'}
                </Message>
            </>
        )
    }

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        toast.success('Proizvod je dodat u korpu')
    }

    const buyNowHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        navigate('/cart')
    }

    return <>
        <Link className='btn btn-outline-secondary mb-4' to='/'>Nazad</Link>

        <Card className='boder-0 shadow-sm p-4 mb-4'>
            <Row className='align-items-center'>
                <Col md={8}>
                    <Badge bg="" style={{ background: '#f0e6e0', color: '#b8860b', marginBottom: '8px' }}>
                        {product.category}
                    </Badge>
                    <h2 className='mb-2'>{product.name}</h2>
                    <Rating value={product.rating} text={`${product.numReviews} recenzija`} />
                </Col>

                <Col md={4} className='text-md-end mt-3 mt-md-0'>
                    <h3 style={{ color: '#b8860b', fontWeight: '700' }} className='mb-0'>{product.price.toFixed(2)} RSD</h3>
                </Col>
            </Row>
        </Card>

        <Row className='gy-4'>
            <Col lg={8}>
                <Card className='border-0 shadow-sm p-4'>
                    <div className='text-center'>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                            style={{ maxHeight: '500px', objectFit: 'contain' }}
                        />
                    </div>
                </Card>
            </Col>

            <Col lg={4}>
                <Card className='border-0 shadow-sm'>
                    <Card.Body>
                        <h4 className='mb-4'>Informacije o proizvodu</h4>
                        <div className='d-flex justify-content-between mb-3'>
                            <span>Kategorija:</span>
                            {product.category}
                        </div>

                        <div className='d-flex justify-content-between align-items-center mb-3'>
                            <span>Status:</span>
                            {product.countInStock > 0 ? (
                                <Badge bg='success'>Dostupno</Badge>
                            ) : (
                                <Badge bg='danger'>Nije dostupno</Badge>
                            )}
                        </div>

                        {product.countInStock > 0 && (
                            <div className='d-flex justify-content-between align-items-center mb-4'>
                                <span>Količina:</span>
                                <Form.Select
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    style={{ width: '90px', borderColor: '#d4af37' }}
                                >
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>
                        )}

                        <div className='d-grid gap-2'>
                            <Button
                                className='add-to-cart-btn'
                                type='button'
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}
                            >Dodaj u korpu</Button>

                            <Button
                                type='button'
                                disabled={product.countInStock === 0}
                                onClick={buyNowHandler}
                                style={{ background: '#2c1b18', border: 'none' }}
                            >Kupi odmah</Button>

                            <Button
                                type='button'
                                variant='outline-secondary'
                                onClick={() => dispatch(toggleWishlistItem(product))}
                                className='d-flex align-items-center justify-content-center gap-2'
                            >
                                {isWished ? <FaHeart color='#d9534f' /> : <FaRegHeart />}
                                {isWished ? 'Ukloni iz liste želja' : 'Dodaj u listu želja'}
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

        <Card className='border-0 shadow-sm mt-4'>
            <Card.Body>
                <h4 className='mb-3'>Opis proizvoda</h4>
                <p className='text-muted mb-0'>{product.description}</p>
            </Card.Body>
        </Card>

        {relatedProducts.length > 0 && (
            <div className="mt-5">
                <h3 className="mb-3" style={{ color: '#2c1b18', fontWeight: '700' }}>Slični proizvodi</h3>
                <Row>
                    {relatedProducts.map((p) => (
                        <Col key={p._id} sm={12} md={6} lg={3}>
                            <Product product={p} />
                        </Col>
                    ))}
                </Row>
            </div>
        )}
    </>
}

export default ProductScreen
