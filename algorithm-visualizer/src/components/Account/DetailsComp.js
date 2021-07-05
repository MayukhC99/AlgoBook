import { useState, useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Container, Row, Col } from 'react-bootstrap'

export default function DetailsComp() {
    const { loginFlag } = useContext(UserContext)
    const [showSaveButton, setShowSaveButton] = useState("")

    const editDetails = (e) => {
        const parentElement = e.target.parentNode.parentNode
        const targetElement = parentElement.children[1].children[0]
        targetElement.removeAttribute("readOnly")
        targetElement.focus()
        e.target.remove()
        setShowSaveButton(parentElement.getAttribute("id"))
    }

    return (
        <Container style={{ display: "block" }}>
            <Row className="mt-3 mb-3" id="username">
                <Col xs={12} sm={6} md={2}>
                    Username
                    <button className="ml-3" style={{ color: 'blue', padding: '0' }} onClick={editDetails}>Edit</button>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="text" value={loginFlag.user.username} readOnly disabled />
                </Col>
            </Row>
            <Row className="mt-3 mb-3" id="first_name">
                <Col xs={12} sm={6} md={2}>
                    Name
                    <button className="ml-3" style={{ color: 'blue', padding: '0' }} onClick={editDetails}>Edit</button>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="text" value={loginFlag.user.first_name} readOnly />
                </Col>
            </Row>
            {
                showSaveButton === "first_name" &&
                <Row>
                    <Col xs={6} sm={4} md={3} style={{ textAlign: 'right' }}>
                        <button className="btn btn-primary">Save</button>
                    </Col>
                    <Col xs={6} sm={3} md={2} style={{ textAlign: 'left' }}>
                        <button className="btn btn-secondary">Cancel</button>
                    </Col>
                </Row>
            }
            <Row className="mt-3 mb-3" id="last_name">
                <Col xs={12} sm={6} md={2}>
                    Name
                    <button className="ml-3" style={{ color: 'blue', padding: '0' }} onClick={editDetails}>Edit</button>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="text" value={loginFlag.user.last_name} readOnly />
                </Col>
            </Row>
            {
                showSaveButton === "last_name" &&
                <Row>
                    <Col xs={6} sm={4} md={3} style={{ textAlign: 'right' }}>
                        <button className="btn btn-primary">Save</button>
                    </Col>
                    <Col xs={6} sm={3} md={2} style={{ textAlign: 'left' }}>
                        <button className="btn btn-secondary">Cancel</button>
                    </Col>
                </Row>
            }
            <Row className="mt-3 mb-3" id="email_id">
                <Col xs={12} sm={6} md={2}>
                    Name
                    <button className="ml-3" style={{ color: 'blue', padding: '0' }} onClick={editDetails}>Edit</button>
                </Col>
                <Col xs={12} sm={6} md={4}>
                    <input type="text" value={loginFlag.user.email_id} readOnly />
                </Col>
            </Row>
            {
                showSaveButton === "email_id" &&
                <Row>
                    <Col xs={6} sm={4} md={3} style={{ textAlign: 'right' }}>
                        <button className="btn btn-primary">Save</button>
                    </Col>
                    <Col xs={6} sm={3} md={2} style={{ textAlign: 'left' }}>
                        <button className="btn btn-secondary">Cancel</button>
                    </Col>
                </Row>
            }
        </Container>
    )
}
