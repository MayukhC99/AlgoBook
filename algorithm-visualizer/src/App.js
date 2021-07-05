import { useState, useMemo, useEffect } from 'react'
import { CardContext } from './Context/CardContext'
import { UserContext } from './Context/UserContext'
import axios from 'axios'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Footer from './components/Footer'
import GraphVisualizer from './components/Graph/GraphVisualizer'
import SearchingVisualizer from './components/Searching/SearchingVisualizer'
import SortingVisualizer from './components/Sorting/SortingVisualizer'
import ChatComponent from './components/Chat_Room/ChatComponent'
import UserForm from './components/UserOperations/UserForm'
import MyAccount from './components/Account/MyAccount'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';

// const cardData = [
//     {
//         id: 1,
//         title: `Breadth First and Depth First Algorithms`,
//         body: `A simple simulation of Breadth First Traversal and Depth First traversal
//           on an undirected graph created by the user.`,
//         name: `BFS and DFS`,
//         type: "graph",
//         link: "/graphVisualizer/bfsdfs"
//     },
//     {
//         id: 2,
//         title: `Dijkstra's Shortest Path Algorithm`,
//         body: `A simulation of Djikstra's Shortest Path Algorithm and finding the shortest
//           paths from the chosen source vertex to all the nodes.`,
//         name: `Dijkstra's Algorithm`,
//         type: "graph",
//         link: "/graphVisualizer/dijkstra"
//     },
//     {
//         id: 3,
//         title: `Kruskal's Minimal Spanning Tree`,
//         body: `A simple simulation Kruskal's Algorithm for finding the Minimal Spanning
//           Tree of a connected undirected weighted graph.`,
//         name: `Kruskal's MST`,
//         type: "graph",
//         link: "/graphVisualizer/KruskalMST"
//     },
//     {
//         id: 4,
//         title: `Linear Search Algorithm`,
//         body: `A simple simulation of Linear Search and Binary Search on an array of integers meant
//           for understanding them better.`,
//         name: `Linear Search`,
//         type: "searching",
//         link: "/searchingVisualizer/linearsearch"
//     },
//     {
//         id: 5,
//         title: `Binary Search Algorithm`,
//         body: `A simple simulation of Linear Search and Binary Search on an array of integers meant
//           for understanding them better.`,
//         name: `Binary Search`,
//         type: "searching",
//         link: "/searchingVisualizer/binarysearch"
//     },
//     {
//         id: 6,
//         title: `Interpolation Search Algorithm`,
//         body: `A simple simulation of Linear Search and Binary Search on an array of integers meant
//           for understanding them better.`,
//         name: `Interpolation Search`,
//         type: "searching",
//         link: "/searchingVisualizer/interpolationsearch"
//     },
//     {
//         id: 7,
//         title: `Sorting Visualizer`,
//         body: `Simulation of Bubble Sort, Selection Sort, Insertion Sort, Merge Sort and Quick Sort on
//           randomly chosen data values.`,
//         name: `Sorting Algorithms`,
//         type: "sorting",
//         link: "/sortingVisualizer"
//     },
// ]

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
            if (Favorites.indexOf(e.target.dataset.favId) !== -1) {
                setFavorites(prev => prev.filter(item => item !== e.target.dataset.favId))
            } else {
                addToFavorites(e.target.dataset.favId)
            }
        } else if ('favId' in e.target.parentNode.dataset) {
            if (Favorites.indexOf(e.target.parentNode.dataset.favId) !== -1) {
                setFavorites(prev => prev.filter(item => item !== e.target.parentNode.dataset.favId))
            } else {
                addToFavorites(e.target.parentNode.dataset.favId)
            }
        }
    }

    const addToFavorites = (id) => {
        axios.post("/api/algo/add/fav", { id })
            .then(res => {
                if (res.data.status === "success") {
                    setFavorites(prev => [...prev, id])
                }
            })
    }

    const removeFromFavorites = (id) => {

    }

    const changeProfileImg = (data) => {
        axios.post('/api/root/upload/profile_image', data)
            .then(res => {
                if (res.data.file) {
                    setUserDetails(prev => {
                        const newData = prev
                        newData.user.profile_picture = res.data.file
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
                        const newData = prev
                        newData.user.cover_picture = res.data.file
                        return newData
                    })
                }
            })
    }

    const changeDetails = (data) => {

    }

    const changePassword = (data) => {

    }

    // const providerValue = useMemo(() => ({ cardData, Favorites, addFavorite, removeFavorite }), [])

    return (
        <div className="App">
            {
                cardData.length ?
                    <Router>
                        <NavBar userDetails={userDetails} />
                        <Switch>
                            <UserContext.Provider value={{ userDetails, changeProfileImg, changeCoverImg, changeDetails, changePassword }} >
                                <CardContext.Provider value={{ cardData, Favorites, changeFavIcons }} >
                                    <Route exact path="/" component={Home} />
                                    <Route path="/home" component={Home} />
                                    <Route path="/graphVisualizer" component={GraphVisualizer} />
                                    <Route path="/searchingVisualizer" component={SearchingVisualizer} />
                                    <Route path="/sortingVisualizer" component={SortingVisualizer} />
                                    <Route path="/chat_room" component={ChatComponent} />
                                    <Route path="/signIn" render={() => <UserForm loginFlag={true} />} />
                                    <Route path="/signUp" render={() => <UserForm loginFlag={false} />} />
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
            <Footer />
        </div>
    );
}

export default App;
