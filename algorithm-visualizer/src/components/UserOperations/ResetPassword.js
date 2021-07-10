import { useState, useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import styled from "styled-components";
import axios from 'axios'

function ResetPassword() {

    const [email_id, setEmailId] = useState(decodeURIComponent(document.cookie.match('(^|;)\\s*email_id\\s*=\\s*([^;]+)')?.pop() || ''))

    useEffect(() => {
        return () => {
            axios.post('/api/login/remove/cookie', {})
        }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
            email_id: email_id,
            newPassword: formData.get("newPassword"),
            confirmPassword: formData.get("confirmPassword")
        }
        axios.post('/api/login/reset_password', data)
            .then(res => {
                if (res.data.error) {
                    alert(res.data.error)
                } else if (res.data.success) {
                    alert(res.data.success)
                    window.location.href = '/signIn'
                }
            })
    }

    return (
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Template>
                <Row>
                    <Col xs={12}>
                        <Form id="changePasswordForm" onSubmit={submitHandler}>
                            <Form.Group>
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" name="newPassword" placeholder="Enter new password" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="confirmPassword" placeholder="Confirm new password" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={12}>
                        <button className="btn btn-primary" form="changePasswordForm" style={{ margin: '15px 0' }}>Send</button>
                    </Col>
                </Row>
            </Template>
        </Container>
    )
}

const Template = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    margin: 25px 0;
`

export default ResetPassword
