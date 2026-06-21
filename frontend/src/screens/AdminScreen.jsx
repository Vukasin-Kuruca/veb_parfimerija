import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



function AdminScreen() {
    const { userInfo } = useSelector((state) => state.auth)

if (!userInfo || !userInfo.isAdmin) {
    return <Navigate to="/login" />
}
    return (
        <Container className="py-4">
            <h1 className="mb-4">Admin Panel</h1>

            <Row className="g-4">
    <Col md={3}>
        <Card className="text-center shadow">
            <Card.Body>
                <h2>24</h2>
                <p>Proizvoda</p>
            </Card.Body>
        </Card>
    </Col>

    <Col md={3}>
        <Card className="text-center shadow">
            <Card.Body>
                <h2>15</h2>
                <p>Korisnika</p>
            </Card.Body>
        </Card>
    </Col>

    <Col md={3}>
        <Card className="text-center shadow">
            <Card.Body>
                <h2>42</h2>
                <p>Porudžbina</p>
            </Card.Body>
        </Card>
    </Col>

    <Col md={3}>
        <Card className="text-center shadow">
            <Card.Body>
                <h2>1250€</h2>
                <p>Prihod</p>
            </Card.Body>
        </Card>
    </Col>
</Row>
        </Container>
    );
    
}

export default AdminScreen;