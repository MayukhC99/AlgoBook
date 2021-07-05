import { useState, useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Container, Row, Col } from 'react-bootstrap'

export default function ChangePasswordComp() {
    const { changePassword } = useContext(UserContext)

    const submitHandler = () => {
        const currentPassword = document.getElementById("currentPassword").value
        const newPassword = document.getElementById("newPassword").value
        if (currentPassword === newPassword) {
            changePassword(newPassword)
        } else {
            alert("Passwords not matching")
        }
    }

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6} md={2}>
                    Current Password
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="password" id="currentPassword" placeholder="Enter current password" />
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6} md={2}>
                    New Password
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="password" id="newPassword" placeholder="Enter new password" />
                </Col>
            </Row>
            <Row>
                <Col xs={6} sm={4} md={3} style={{ textAlign: 'right' }}>
                    <button className="btn btn-primary" onClick={submitHandler}>Save</button>
                </Col>
            </Row>
        </Container>
    )
}
