import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaHeart, FaRegHeart, FaCartPlus } from 'react-icons/fa'
import Rating from './Rating'
import { addToCart } from '../slices/cartSlice'
import { toggleWishlistItem } from '../slices/wishlistSlice'

const Product = ({ product }) => {
    const dispatch = useDispatch()

    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems)
    const isWished = wishlistItems.some((x) => x._id === product._id)

    const addToCartHandler = (e) => {
        e.preventDefault()
        dispatch(addToCart({ ...product, qty: 1 }))
    }

    const wishlistHandler = (e) => {
        e.preventDefault()
        dispatch(toggleWishlistItem(product))
    }

    return (
        <Card
            className='my-3 p-3 rounded border-0 shadow-sm position-relative product-card'
            style={{
                background: '#fffaf7',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
            }}
        >
            <div className="position-absolute" style={{ top: '15px', left: '15px', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {product.rating >= 4.8 && (
                    <Badge bg="" style={{ background: '#d4af37', color: '#2c1b18' }}>Bestseler</Badge>
                )}
                {product.price >= 15000 && (
                    <Badge bg="" style={{ background: '#2c1b18', color: '#f8e7d1' }}>Premium</Badge>
                )}
                {product.countInStock > 0 && product.countInStock <= 5 && (
                    <Badge bg="danger">Poslednji komadi</Badge>
                )}
            </div>

            <button
                onClick={wishlistHandler}
                className="position-absolute border-0 bg-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ top: '15px', right: '15px', zIndex: 2, width: '36px', height: '36px', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}
                title="Dodaj u listu želja"
            >
                {isWished ? <FaHeart color='#d9534f' /> : <FaRegHeart color='#5a4a42' />}
            </button>

            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                <Card.Img
                    src={product.image}
                    variant='top'
                    style={{
                        height: '260px',
                        objectFit: 'cover',
                        borderRadius: '10px'
                    }}
                    className="product-img"
                />
            </Link>

            <Card.Body className="text-center">
                <Card.Subtitle
                    className="mb-1"
                    style={{ color: '#b8860b', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}
                >
                    {product.category}
                </Card.Subtitle>

                <Link
                    to={`/product/${product._id}`}
                    style={{ textDecoration: 'none', color: '#2c1b18' }}
                >
                    <Card.Title
                        as='div'
                        className="product-title"
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            letterSpacing: '0.5px',
                            marginTop: '4px'
                        }}
                    >
                        {product.name}
                    </Card.Title>
                </Link>

                <Card.Text as="div" style={{ margin: '8px 0' }}>
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} recenzija`}
                    />
                </Card.Text>

                <Card.Text
                    as='h4'
                    style={{
                        color: '#b8860b',
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                    }}
                >
                    {product.price.toFixed(2)} RSD
                </Card.Text>

                <button
                    className="add-to-cart-btn btn w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                >
                    <FaCartPlus /> {product.countInStock === 0 ? 'Nedostupno' : 'Dodaj u korpu'}
                </button>
            </Card.Body>
        </Card>
    )
}

export default Product
