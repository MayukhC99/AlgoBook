import { Container, Row, Col } from 'react-bootstrap'

export default function ChangePasswordComp() {
    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6}>
                    Current Password
                </Col>
                <Col xs={12} sm={6}>
                    <input type="password" readOnly placeholder="Enter current password" />
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6}>
                    New Password
                </Col>
                <Col xs={12} sm={6}>
                    <input type="password" readOnly placeholder="Enter new password" />
                </Col>
            </Row>
        </Container>
    )
}
