import { useState, useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Container, Row, Col } from 'react-bootstrap'

export default function DetailsComp() {
    const { userDetails, changeDetails } = useContext(UserContext)
    const [firstName, setFirstName] = useState(userDetails.user.first_name)
    const [lastName, setLastName] = useState(userDetails.user.last_name)
    const [emailId, setEmailId] = useState(userDetails.user.email_id)
    const [showSaveButton, setShowSaveButton] = useState(false)

    const submitHandler = () => {
        const data = {
            first_name: firstName,
            last_name: lastName,
            email_id: emailId
        }
        changeDetails(data)
        setShowSaveButton(false)
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
                    <input type="text" id="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} readOnly={!showSaveButton} />
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6} md={2}>
                    Last Name
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="text" id="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} readOnly={!showSaveButton} />
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col xs={12} sm={6} md={2}>
                    Email Id
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="email" id="email_id" value={emailId} onChange={(e) => setEmailId(e.target.value)} readOnly={!showSaveButton} />
                </Col>
            </Row>
            {
                !showSaveButton &&
                <Row>
                    <Col xs={6} sm={4} md={3} style={{ textAlign: 'right' }}>
                        <button className="btn btn-primary" onClick={() => setShowSaveButton(true)}>Edit</button>
                    </Col>
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
