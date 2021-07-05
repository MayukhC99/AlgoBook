import { useState, useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

export default function ChangePasswordComp() {

    const changePassword = (data) => {
        axios.post('/api/account/change_password', data)
        .then(res => {
            const data = res.data || {};
            if ( data.error ){
                alert('There has been an error while updating your password. Please try again.')
            } else if (res.data) {
                alert('Password successfully updated');
                window.location.href='/';
            }
        })
    }

    const submitHandler = () => {
        const newPassword = document.getElementById("currentPassword").value
        const confirmPassword = document.getElementById("newPassword").value
        if (confirmPassword === newPassword) {
            changePassword({'password' :newPassword});
        } else {
            alert("Passwords not matching")
        }
    }

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6} md={2}>
                    New Password
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="password" id="currentPassword" placeholder="Enter current password" />
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6} md={2}>
                    Confirm Password
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
