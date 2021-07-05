import { useState, useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Container, Row, Col } from 'react-bootstrap'

export default function ChangePasswordComp() {
    const { userDetails, changePassword } = useContext(UserContext)
    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6} md={2}>
                    Current Password
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="password" placeholder="Enter current password" />
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6} md={2}>
                    New Password
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="password" placeholder="Enter new password" />
                </Col>
            </Row>
        </Container>
    )
}
