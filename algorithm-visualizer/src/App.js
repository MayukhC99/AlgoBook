import { useState, useMemo, useEffect } from 'react'
import { CardContext } from './Context/CardContext'
import { UserContext } from './Context/UserContext'
import axios from 'axios'
import NavBar from './components/NavBar'
import Home from './components/Home'
import GraphVisualizer from './components/Graph/GraphVisualizer'
import SearchingVisualizer from './components/Searching/SearchingVisualizer'
import SortingVisualizer from './components/Sorting/SortingVisualizer'
import ChatComponent from './components/Chat_Room/ChatComponent'
import UserForm from './components/UserOperations/UserForm'
import ForgotPassword from './components/UserOperations/ForgotPassword'
import ResetPassword from './components/UserOperations/ResetPassword'
import MyAccount from './components/Account/MyAccount'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';

function App() {

    const [cardData, setCardData] = useState([])
    const [Favorites, setFavorites] = useState([])
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        axios.get("/api/algo/getAll")
            .then(res => {
                setCardData(res.data)
                if (res.data) {
                    axios.get("/api/algo/get/fav")
                        .then(res => {
                            setFavorites(res.data)
                        })
                }
            })
        axios.get("/api/root/verify_user")
            .then(res => {
                setUserDetails(res.data)
            })
    }, []);

    const changeFavIcons = (e) => {
        if ('favId' in e.target.dataset) {
            if (Favorites.find(o => o.algoId == e.target.dataset.favId) !== undefined) {
                removeFromFavorites(e.target.dataset.favId)
            } else {
                addToFavorites(e.target.dataset.favId)
            }
        } else if ('favId' in e.target.parentNode.dataset) {
            if (Favorites.find(o => o.algoId == e.target.parentNode.dataset.favId) !== undefined) {
                removeFromFavorites(e.target.parentNode.dataset.favId)
            } else {
                addToFavorites(e.target.parentNode.dataset.favId)
            }
        }
    }

    const addToFavorites = (id) => {
        axios.post("/api/algo/add/fav", { id })
            .then(res => {
                if (res.data.status && res.data.status === "success") {
                    console.log(res.data.data)
                    setFavorites(prev => [...prev, res.data.data])
                }
            })
    }

    const removeFromFavorites = (id) => {
        axios.post("/api/algo/undo/fav", { id })
            .then(res => {
                if (res.data.status && res.data.status === "success") {
                    setFavorites(prev => prev.filter(item => item.algoId != id))
                }
            })
    }

    const changeProfileImg = (data) => {
        axios.post('/api/root/upload/profile_image', data)
            .then(res => {
                if (res.data.file) {
                    setUserDetails(prev => {
                        const newData = JSON.parse(JSON.stringify(prev))
                        newData.user.profile_picture = res.data.file
                        newData.user.profile_cloudinary_id = res.data.cloudinary_id
                        return newData
                    })
                }
            })
    }

    const changeCoverImg = (data) => {
        axios.post('/api/root/upload/cover_image', data)
            .then(res => {
                if (res.data.file) {
                    setUserDetails(prev => {
                        const newData = JSON.parse(JSON.stringify(prev))
                        newData.user.cover_picture = res.data.file
                        newData.user.cover_cloudinary_id = res.data.cloudinary_id
                        return newData
                    })
                }
            })
    }

    const changeDetails = (data) => {
        axios.post("/api/account/edit", data)
            .then(res => {
                if (!res.data.error) {
                    setUserDetails(prev => {
                        const newData = JSON.parse(JSON.stringify(prev))
                        newData.user.first_name = res.data.first_name
                        newData.user.last_name = res.data.last_name
                        newData.user.email_id = res.data.email_id
                        return newData
                    })
                }
            })
    }

    // const providerValue = useMemo(() => ({ cardData, Favorites, addFavorite, removeFavorite }), [])

    return (
        <div className="App">
            {
                (cardData.length && userDetails != null) ?
                    <Router>
                        <NavBar userDetails={userDetails} />
                        <Switch>
                            <UserContext.Provider value={{ userDetails, changeProfileImg, changeCoverImg, changeDetails }} >
                                <CardContext.Provider value={{ cardData, Favorites, changeFavIcons }} >
                                    <Route exact path="/" component={Home} />
                                    <Route path="/home" component={Home} />
                                    <Route path="/graphVisualizer" component={GraphVisualizer} />
                                    <Route path="/searchingVisualizer" component={SearchingVisualizer} />
                                    <Route path="/sortingVisualizer" component={SortingVisualizer} />
                                    <Route path="/chat_room" component={ChatComponent} />
                                    <Route path="/signIn" render={() => <UserForm loginFlag={true} />} />
                                    <Route path="/signUp" render={() => <UserForm loginFlag={false} />} />
                                    <Route path="/forgotPassword" component={ForgotPassword} />
                                    <Route path="/reset_password" component={ResetPassword} />
                                    <Route path="/account" component={MyAccount} />
                                    {/* <Redirect to="/home"></Redirect> */}
                                </CardContext.Provider>
                            </UserContext.Provider>
                        </Switch>
                    </Router>
                    :
                    <div class="loader">
                        <div class="progress">
                            <div class="progress-bar bg-success" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default App;
