import { useState, useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Container, Row, Col } from 'react-bootstrap'

export default function DetailsComp() {
    const { userDetails, changeDetails } = useContext(UserContext)
    const [showSaveButton, setShowSaveButton] = useState(false)

    const submitHandler = () => {
        const first_name = document.getElementById("first_name").value
        const last_name = document.getElementById("last_name").value
        const email_id = document.getElementById("email_id").value
        const data = { first_name, last_name, email_id }
        changeDetails(data)
    }

    return (
        <Container style={{ display: "block" }}>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6} md={2}>
                    Username
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="text" value={userDetails.user.username} readOnly disabled />
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6} md={2}>
                    First Name
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="text" id="first_name" value={userDetails.user.first_name} readOnly={!showSaveButton} />
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6} md={2}>
                    Last Name
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="text" id="last_name" value={userDetails.user.last_name} readOnly={!showSaveButton} />
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6} md={2}>
                    Email Id
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="email" id="email_id" value={userDetails.user.email_id} readOnly={!showSaveButton} />
                </Col>
            </Row>
            {
                !showSaveButton &&
                <Row>
                    <button className="btn btn-primary" style={{ color: 'blue', padding: '0' }} onClick={() => setShowSaveButton(true)}>Edit</button>
                </Row>
            }
            {
                showSaveButton &&
                <Row>
                    <Col xs={6} sm={4} md={3} style={{ textAlign: 'right' }}>
                        <button className="btn btn-primary" onClick={submitHandler}>Save</button>
                    </Col>
                    <Col xs={6} sm={3} md={2} style={{ textAlign: 'left' }}>
                        <button className="btn btn-secondary" onClick={() => setShowSaveButton(false)}>Cancel</button>
                    </Col>
                </Row>
            }
        </Container>
    )
}
