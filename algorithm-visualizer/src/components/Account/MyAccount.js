import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import DetailsComp from './DetailsComp'
import FavoritesComp from './FavoritesComp'
import ChangePasswordComp from './ChangePasswordComp'
import './account.css'

export default function MyAccount() {
    return (
        <div>
            <Container>
                <Row>
                    <div className="pics">
                        <div id="cover-pic"></div>
                        <div id="profile-pic"></div>
                    </div>
                </Row>
                <Row>
                    <Col>
                        <h4>Supratim Saha</h4>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Tabs defaultActiveKey="Details" style={{ width: '100%' }}>
                        <Tab eventKey="Details" title="Details">
                            <DetailsComp />
                        </Tab>
                        <Tab eventKey="Favorites" title="Favorites">
                            <FavoritesComp />
                        </Tab>
                        <Tab eventKey="Change Password" title="Change Password">
                            <ChangePasswordComp />
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        </div>
    )
}
