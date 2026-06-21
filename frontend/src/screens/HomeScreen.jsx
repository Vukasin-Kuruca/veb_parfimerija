import React, { useMemo, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import products from "../products_list"
import Product from "../components/Product";
import Message from "../components/Message";

const categories = ['Sve', 'Muški parfemi', 'Ženski parfemi', 'Uniseks parfemi']

const HomeScreen = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search') || ''
    const categoryParam = searchParams.get('category') || 'Sve'

    const [sortBy, setSortBy] = useState('default')

    const setCategory = (cat) => {
        const params = {}
        if (search) params.search = search
        if (cat !== 'Sve') params.category = cat
        setSearchParams(params)
    }

    const filteredProducts = useMemo(() => {
        let list = [...products]

        if (search) {
            const term = search.toLowerCase()
            list = list.filter(
                (p) =>
                    p.name.toLowerCase().includes(term) ||
                    p.description.toLowerCase().includes(term) ||
                    p.category.toLowerCase().includes(term)
            )
        }

        if (categoryParam !== 'Sve') {
            list = list.filter((p) => p.category === categoryParam)
        }

        switch (sortBy) {
            case 'price_asc':
                list.sort((a, b) => a.price - b.price)
                break
            case 'price_desc':
                list.sort((a, b) => b.price - a.price)
                break
            case 'rating':
                list.sort((a, b) => b.rating - a.rating)
                break
            default:
                break
        }

        return list
    }, [search, categoryParam, sortBy])

    return (
        <>
            {!search && categoryParam === 'Sve' && (
                <div
                    className="rounded mb-4 p-5 text-center position-relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(120deg, #2c1b18, #4a2f29 60%, #b8860b)',
                        color: '#f8e7d1'
                    }}
                >
                    <h1 className="fw-bold" style={{ letterSpacing: '3px' }}>
                        🌸 VEB PARFIMERIJA
                    </h1>
                    <p className="mb-3" style={{ color: '#e6d5cc' }}>
                        Otkrijte svet luksuznih i nišnih mirisa — pažljivo odabranih za svaku priliku.
                    </p>
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                        {categories.slice(1).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className="btn"
                                style={{
                                    background: 'rgba(248,231,209,0.1)',
                                    border: '1px solid #d4af37',
                                    color: '#f8e7d1'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
                <h1 style={{ color: '#2c1b18', fontWeight: '700' }}>
                    {search
                        ? `Rezultati pretrage za "${search}"`
                        : categoryParam !== 'Sve'
                            ? categoryParam
                            : 'Svi proizvodi'}
                </h1>

                <div className="d-flex gap-2 align-items-center flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className="btn btn-sm"
                            style={{
                                background: categoryParam === cat ? '#b8860b' : '#fffaf7',
                                color: categoryParam === cat ? '#fff' : '#2c1b18',
                                border: '1px solid #d4af37',
                                borderRadius: '20px',
                                padding: '6px 16px'
                            }}
                        >
                            {cat}
                        </button>
                    ))}

                    <Form.Select
                        size="sm"
                        style={{ width: 'auto', borderColor: '#d4af37' }}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="default">Sortiraj</option>
                        <option value="price_asc">Cena: rastuće</option>
                        <option value="price_desc">Cena: opadajuće</option>
                        <option value="rating">Najbolje ocenjeni</option>
                    </Form.Select>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <Message>Nema proizvoda koji odgovaraju vašoj pretrazi.</Message>
            ) : (
                <Row>
                    {filteredProducts.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default HomeScreen;