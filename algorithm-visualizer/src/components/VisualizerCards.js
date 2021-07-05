import { useState, useEffect, useContext } from 'react';
import { CardContext } from '../Context/CardContext';
import { Card, Container, Col, Row, Form, FormControl, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as farHeart } from "@fortawesome/fontawesome-free-regular"
import { faHeart } from "@fortawesome/fontawesome-free-solid"

const capitalize = (item) => item.charAt(0).toUpperCase() + item.slice(1)


export default function VisualizerCards() {
    const { cardData, Favorites, changeFavIcons } = useContext(CardContext)
    const [selectedOptions, setSelectedOptions] = useState([])
    const [showCard, setShowCard] = useState(cardData)
    const options = [...new Set(cardData.map(item => item.type))];

    const onOptionClicked = value => () => {
        setSelectedOptions(selectedOptions => [...new Set([...selectedOptions, value])])
    }

    const removeOption = value => () => {
        setSelectedOptions(selectedOptions => selectedOptions.filter(item => item !== value))
    }

    const searchText = (e) => {
        let regexString = e.target.value;
        let regexp = new RegExp(regexString, "gi");
        setShowCard(cardData.filter(item => item.title.search(regexp) !== -1))
    }

    useEffect(() => {
        if (selectedOptions && selectedOptions.length) {
            setShowCard(cardData.filter(item => selectedOptions.indexOf(item.type) !== -1))
        } else {
            setShowCard(cardData)
        }
    }, [selectedOptions])

    return (
        <Container className="mt-5 mb-5" id="visualizer">
            <Row>
                <Col xs={12} md={3} lg={1} >
                    <h1>Visulizer</h1>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6} lg={9} className="mb-2 mt-2">
                    <Form inline>
                        <FormControl type="text" onChange={searchText} placeholder="Search" className="mr-md-2 mx-auto mx-md-0" />
                    </Form>
                </Col>
                <Col sm={12} md={6} lg={3} className="mb-2 mt-2 text-md-right">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Algorithm
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {
                                options.map((option, index) => (
                                    <Dropdown.Item onClick={onOptionClicked(option)} as="button" key={index}>
                                        {capitalize(option)}
                                    </Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row className="p-3">
                {
                    selectedOptions.map((item, index) => (
                        <span id="items" key={index}>
                            {capitalize(item)} <button onClick={removeOption(item)} key={index} type="button" className="close"><span>&times;</span></button>
                        </span>
                    ))
                }
            </Row>
            <Row>
                {
                    showCard.map(item => {
                        return (
                            <Col xs={12} md={6} lg={4} key={item.id} >
                                <Card style={{ width: '18rem', margin: '20px auto' }}>
                                    <Card.Img variant="top" src={`/img/${item.title.replace(/ /g, "_")}.png`} />
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            Favorites.indexOf(item.title) === -1 ?
                                                <Tooltip id="top">
                                                    Add to favorites.
                                                </Tooltip>
                                                :
                                                <Tooltip id="top">
                                                    Remove from favorites.
                                                </Tooltip>
                                        }
                                    >
                                        {
                                            Favorites.indexOf(item.title) !== -1 ?
                                                <FontAwesomeIcon onClick={changeFavIcons} id="solidFavIcon" className="fav-icon" data-fav-name={item.title} icon={faHeart} />
                                                :
                                                <FontAwesomeIcon onClick={changeFavIcons} id="regFavIcon" className="fav-icon" data-fav-name={item.title} icon={farHeart} />
                                        }
                                    </OverlayTrigger>
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                            {item.body}
                                        </Card.Text>
                                        <NavLink to={item.link} className="button button4" variant="primary">{item.name}</NavLink>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container >
    );
}
