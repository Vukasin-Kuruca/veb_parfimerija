import { Container, Row, Col, Card } from "react-bootstrap";
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useGetUsersQuery } from "../slices/usersApiSlice";
import { useGetOrdersQuery } from "../slices/ordersApiSlice";

function AdminScreen() {
    const { userInfo } = useSelector((state) => state.auth)

    const { data: products, isLoading: loadingProducts, error: productsError } = useGetProductsQuery({}, { skip: !userInfo?.isAdmin })
    const { data: users, isLoading: loadingUsers, error: usersError } = useGetUsersQuery(undefined, { skip: !userInfo?.isAdmin })
    const { data: orders, isLoading: loadingOrders, error: ordersError } = useGetOrdersQuery(undefined, { skip: !userInfo?.isAdmin })

    if (!userInfo || !userInfo.isAdmin) {
        return <Navigate to="/login" />
    }

    const isLoading = loadingProducts || loadingUsers || loadingOrders
    const error = productsError || usersError || ordersError

    const revenue = (orders || [])
        .filter((o) => o.isPaid)
        .reduce((acc, o) => acc + o.totalPrice, 0)

    return (
        <Container className="py-4">
            <h1 className="mb-4">Admin Panel</h1>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error || 'Greška pri učitavanju podataka.'}
                </Message>
            ) : (
                <Row className="g-4">
                    <Col md={3}>
                        <Card className="text-center shadow">
                            <Card.Body>
                                <h2>{products?.length ?? 0}</h2>
                                <p>Proizvoda</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card className="text-center shadow">
                            <Card.Body>
                                <h2>{users?.length ?? 0}</h2>
                                <p>Korisnika</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card className="text-center shadow">
                            <Card.Body>
                                <h2>{orders?.length ?? 0}</h2>
                                <p>Porudžbina</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card className="text-center shadow">
                            <Card.Body>
                                <h2>{revenue.toFixed(2)} RSD</h2>
                                <p>Prihod</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default AdminScreen;
