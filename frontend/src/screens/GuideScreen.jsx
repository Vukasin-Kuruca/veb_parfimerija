import { Container, Card } from "react-bootstrap";

function GuideScreen() {
    return (
        <Container className="py-4">
            <h1 className="mb-4">Vodič za izbor parfema</h1>

            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>EDT vs EDP</Card.Title>
                    <Card.Text>
                        <strong>Eau de Toilette (EDT)</strong> sadrži manju
                        koncentraciju parfemskih ulja i traje oko 4-6 sati.
                        <br />
                        <strong>Eau de Parfum (EDP)</strong> ima veću
                        koncentraciju i može trajati 6-12 sati.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Kako izabrati parfem?</Card.Title>
                    <Card.Text>
                        Za dnevnu upotrebu preporučuju se sveži i citrusni
                        mirisi, dok su za večernje prilike popularni intenzivni,
                        drvenasti i orijentalni parfemi.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Kako pravilno nanositi parfem?</Card.Title>
                    <Card.Text>
                        Parfem se najčešće nanosi na vrat, zglobove i iza ušiju.
                        Ne preporučuje se trljanje zglobova nakon nanošenja jer
                        to može promeniti miris.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Kako čuvati parfeme?</Card.Title>
                    <Card.Text>
                        Parfeme treba čuvati na suvom i tamnom mestu, daleko od
                        direktne sunčeve svetlosti i izvora toplote.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default GuideScreen;