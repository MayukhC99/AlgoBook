import { useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import DetailsComp from './DetailsComp'
import FavoritesComp from './FavoritesComp'
import ChangePasswordComp from './ChangePasswordComp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from "@fortawesome/fontawesome-free-solid"
import './account.css'

export default function MyAccount() {

    const [profilePicSrc, setProfilePicSrc] = useState("/img/Carousel1.jpeg")

    const changePhotoHandler = async (e) => {
        const file = e.target.files[0];
        await previewFile(file);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProfilePicSrc(reader.result);
        };
    };

    return (
        <div>
            <Container>
                <Row>
                    <div className="pics">
                        <div id="cover-pic">
                            <div className="cameraIcon">
                                <input type="file" id="chooseCoverImg" hidden />
                                <label htmlFor="chooseCoverImg" style={{ cursor: 'pointer', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><FontAwesomeIcon style={{ fontSize: '18px' }} icon={faCamera} /></label>
                            </div>
                        </div>
                        <div id="profile-pic">
                            <img src={profilePicSrc} alt="" height="200" width="200" />
                            <div className="update" id="update">
                                <div className="pic_update" id="pic_update">
                                    <input type="file" id="chooseProfileImg" onChange={changePhotoHandler} hidden />
                                    <label htmlFor="chooseProfileImg" style={{ cursor: 'pointer' }}>Update</label>
                                </div>
                            </div>
                        </div>
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
