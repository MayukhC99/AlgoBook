import { useState } from 'react';
import { Card, Container, Col, Row, Button, Form, FormControl, Dropdown } from 'react-bootstrap'


export default function VisualizerCards() {
    const [cardState, setCardState] = useState()

    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col xs={12} md={6} lg={4} >
                    <h1>Visulizer</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={6} md={6} lg={9} className="mb-2 mt-2">
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    </Form>
                </Col>
                <Col xs={12} sm={6} md={6} lg={3} className="mb-2 mt-2 text-sm-right">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Searching</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Sorting</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Graph</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6} lg={4} >
                    <Card style={{ width: '18rem', margin: '20px auto' }}>
                        <Card.Img variant="top" src="/img/Carousel1.jpeg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <Card style={{ width: '18rem', margin: '20px auto' }}>
                        <Card.Img variant="top" src="/img/Carousel1.jpeg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <Card style={{ width: '18rem', margin: '20px auto' }}>
                        <Card.Img variant="top" src="/img/Carousel1.jpeg" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
}
