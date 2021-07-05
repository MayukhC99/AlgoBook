import { useState, useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import DetailsComp from './DetailsComp'
import FavoritesComp from './FavoritesComp'
import ChangePasswordComp from './ChangePasswordComp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCloudUploadAlt, faTrash } from "@fortawesome/fontawesome-free-solid"
import './account.css'

export default function MyAccount() {
    const { userDetails, changeProfileImg, changeCoverImg } = useContext(UserContext)
    const [profilePicSrc, setProfilePicSrc] = useState(`/img/${userDetails.user.profile_picture}`)
    const [coverPicSrc, setCoverPicSrc] = useState(`/img/${userDetails.user.cover_picture}`)
    const [saveCancelButton, setSaveCancelButton] = useState(false)
    const [coverSaveCancelButton, setCoverSaveCancelButton] = useState(false)

    const currentProfilePic = `/img/${userDetails.user.profile_picture}`
    const currentCoverPic = `/img/${userDetails.user.cover_picture}`

    const changePhotoHandler = async (e) => {
        const file = e.target.files[0];
        await previewFile(file);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProfilePicSrc(reader.result);
            setSaveCancelButton(true)
        };
    };

    const changeCoverPhotoHandler = async (e) => {
        const file = e.target.files[0];
        await previewCoverFile(file);
    }

    const previewCoverFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setCoverPicSrc(reader.result);
            setCoverSaveCancelButton(true)
        };
    };

    const hideSaveCancelButton = () => {
        setProfilePicSrc(currentProfilePic)
        setSaveCancelButton(false)
    }

    const hideCoverSaveCancelButton = () => {
        setCoverPicSrc(currentCoverPic)
        setCoverSaveCancelButton(false)
    }

    const profilePicSubmitHandler = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        changeProfileImg(form)
        setSaveCancelButton(false)
    }

    const coverPicSubmitHandler = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        changeCoverImg(form)
        setCoverSaveCancelButton(false)
    }

    return (
        <div>
            <Container>
                <Row>
                    <div className="pics">
                        <div id="cover-pic" style={{ backgroundImage: `url(${coverPicSrc})`, overflow: 'hidden' }}>
                            <form className="cameraIcon" id="cameraIcon" onSubmit={coverPicSubmitHandler} style={coverSaveCancelButton ? { marginRight: '165px' } : { marginRight: '50px' }} >
                                <input type="file" id="chooseCoverImg" name="profile_image" onChange={changeCoverPhotoHandler} hidden />
                                <label htmlFor="chooseCoverImg" style={{ cursor: 'pointer', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesomeIcon style={{ fontSize: '18px' }} icon={faCamera} />
                                </label>
                            </form>
                            {
                                coverSaveCancelButton &&
                                <>
                                    <button type="submit" form="cameraIcon" id="upload_btn" style={{ float: 'right', cursor: 'pointer', marginRight: '-105px', backgroundColor: 'white', width: '40px', height: '40px', marginTop: '10px', borderRadius: '50%' }}>
                                        <FontAwesomeIcon icon={faCloudUploadAlt} />
                                    </button>
                                    <label style={{ float: 'right', cursor: 'pointer', marginRight: '-170px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: '40px', height: '40px', marginTop: '10px', borderRadius: '50%' }}>
                                        <FontAwesomeIcon icon={faTrash} onClick={hideCoverSaveCancelButton} />
                                    </label>
                                </>
                            }
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
                            <img src={profilePicSrc} alt="" height="200" width="200" style={{ margin: '-5px 0 0 -5px' }} />
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
                        <h4>{userDetails.user.first_name + " " + userDetails.user.last_name}</h4>
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
