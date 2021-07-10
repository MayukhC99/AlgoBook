import { Container, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'

function ForgotPassword() {

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
            email_id: formData.get("email_id")
        }
        axios.post('/api/login/forgot/password', data)
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
        <Container>
            <Row>
                <Col style={{ margin: '25px 0' }}>
                    <h4>Type your registered Email Id</h4>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Form id="forgotPasswordForm" onSubmit={submitHandler}>
                        <input type="email" name="email_id" placeholder="Enter you email id" />
                    </Form>
                </Col>
                <Col xs={12}>
                    <button className="btn btn-primary" form="forgotPasswordForm" style={{ margin: '15px 0' }}>Send</button>
                </Col>
            </Row>
        </Container>
    )
}

export default ForgotPassword;
