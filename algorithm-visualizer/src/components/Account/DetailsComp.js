import { Container, Row, Col } from 'react-bootstrap'

export default function DetailsComp() {
    return (
        <Container style={{ display: "block" }}>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6} md={2}>
                    Username
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="text" value="supra1999" readOnly disabled />
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6} md={2}>
                    Name
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="text" value="Supratim Saha" />
                </Col>
            </Row>
        </Container>
    )
}
