import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <Card
            className='my-3 p-3 rounded border-0 shadow-sm'
            style={{
                background: '#fffaf7',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
            }}
        >
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
                <Link
                    to={`/product/${product._id}`}
                    style={{ textDecoration: 'none', color: '#2c1b18' }}
                >
                    <Card.Title
                        as='div'
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            letterSpacing: '0.5px',
                            marginTop: '10px'
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
                    {product.price} RSD
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product