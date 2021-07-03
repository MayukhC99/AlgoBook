import { useContext } from 'react'
import { CardContext } from '../../Context/CardContext';
import { Container, Row, Col, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/fontawesome-free-solid"

export default function FavoritesComp() {

    const { cardData, Favorites, changeFavIcons } = useContext(CardContext)

    return (
        <Container>
            <Row>
                {
                    Favorites.length === 0 ?
                        <h4>You don't have any Favorites</h4>
                        :
                        cardData.map(item => {
                            return (
                                Favorites.indexOf(item.title) !== -1 &&
                                <Col xs={12} md={6} lg={4} key={item.id} >
                                    <Card style={{ width: '18rem', margin: '20px auto' }}>
                                        <Card.Img variant="top" src="/img/Carousel1.jpeg" />
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip id="top">
                                                    Remove from favorites.
                                                </Tooltip>
                                            }
                                        >
                                            <FontAwesomeIcon onClick={changeFavIcons} id="solidFavIcon" className="fav-icon" data-fav-name={item.title} icon={faHeart} />
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
        </Container>
    )
}
