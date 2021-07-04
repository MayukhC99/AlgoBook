import { useState, useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import DetailsComp from './DetailsComp'
import FavoritesComp from './FavoritesComp'
import ChangePasswordComp from './ChangePasswordComp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCloudUploadAlt, faTrash } from "@fortawesome/fontawesome-free-solid"
import axios from 'axios'
import './account.css'

export default function MyAccount() {
    const { loginFlag, changeProfileImg } = useContext(UserContext)
    const [profilePicSrc, setProfilePicSrc] = useState(`/img/${loginFlag.user.profile_picture}`)
    const [saveCancelButton, setSaveCancelButton] = useState(false)

    const currentProfilePic = `/img/${loginFlag.user.profile_picture}`

    const changePhotoHandler = async (e) => {
        const file = e.target.files[0];
        await previewFile(file);
        setSaveCancelButton(true)
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProfilePicSrc(reader.result);
        };
    };

    const hideSaveCancelButton = () => {
        setProfilePicSrc(currentProfilePic)
        setSaveCancelButton(false)
    }

    const profilePicSubmitHandler = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        changeProfileImg(form)
        setSaveCancelButton(false)
    }

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
                            {
                                saveCancelButton &&
                                <div id="layer">
                                    <button type="submit" form="pic_update" id="upload_btn">
                                        <FontAwesomeIcon icon={faCloudUploadAlt} style={{ color: 'white', margin: '0 60px 0 0', cursor: 'pointer' }} />
                                    </button>
                                    <FontAwesomeIcon icon={faTrash} onClick={hideSaveCancelButton} style={{ color: 'white', marginTop: '80px', cursor: 'pointer' }} />
                                </div>
                            }
                            <img src={profilePicSrc} alt="" height="200" width="200" />
                            <div className="update" id="update">
                                <form className="pic_update" id="pic_update" onSubmit={profilePicSubmitHandler}>
                                    <input type="file" id="chooseProfileImg" name="profile_image" onChange={changePhotoHandler} hidden />
                                    <label htmlFor="chooseProfileImg" style={{ cursor: 'pointer' }}>Update</label>
                                </form>
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
