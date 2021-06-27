import { useState, useEffect } from 'react';
import { Card, Container, Col, Row, Form, FormControl, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as farHeart } from "@fortawesome/fontawesome-free-regular"
import { faHeart } from "@fortawesome/fontawesome-free-solid"

const cardData = [
    {
        id: 1,
        title: `Breadth First and Depth First Algorithms`,
        body: `A simple simulation of Breadth First Traversal and Depth First traversal
            on an undirected graph created by the user.`,
        name: `BFS and DFS`,
        type: "graph",
        link: "/graphVisualizer/bfsdfs"
    },
    {
        id: 2,
        title: `Dijkstra's Shortest Path Algorithm`,
        body: `A simulation of Djikstra's Shortest Path Algorithm and finding the shortest
            paths from the chosen source vertex to all the nodes.`,
        name: `Dijkstra's Algorithm`,
        type: "graph",
        link: "/graphVisualizer/dijkstra"
    },
    {
        id: 3,
        title: `Kruskal's Minimal Spanning Tree`,
        body: `A simple simulation Kruskal's Algorithm for finding the Minimal Spanning
            Tree of a connected undirected weighted graph.`,
        name: `Kruskal's MST`,
        type: "graph",
        link: "/graphVisualizer/KruskalMST"
    },
    {
        id: 4,
        title: `Linear Search Algorithm`,
        body: `A simple simulation of Linear Search and Binary Search on an array of integers meant
            for understanding them better.`,
        name: `Linear Search`,
        type: "searching",
        link: "/searchingVisualizer/linearsearch"
    },
    {
        id: 5,
        title: `Binary Search Algorithm`,
        body: `A simple simulation of Linear Search and Binary Search on an array of integers meant
            for understanding them better.`,
        name: `Binary Search`,
        type: "searching",
        link: "/searchingVisualizer/binarysearch"
    },
    {
        id: 6,
        title: `Interpolation Search Algorithm`,
        body: `A simple simulation of Linear Search and Binary Search on an array of integers meant
            for understanding them better.`,
        name: `Interpolation Search`,
        type: "searching",
        link: "/searchingVisualizer/interpolationsearch"
    },
    {
        id: 7,
        title: `Sorting Visualizer`,
        body: `Simulation of Bubble Sort, Selection Sort, Insertion Sort, Merge Sort and Quick Sort on
            randomly chosen data values.`,
        name: `Sorting Algorithms`,
        type: "sorting",
        link: "/sortingVisualizer"
    },
]

const Favorites = [`Interpolation Search Algorithm`, `Sorting Visualizer`]

const capitalize = (item) => item.charAt(0).toUpperCase() + item.slice(1)

const options = [...new Set(cardData.map(item => item.type))];

export default function VisualizerCards() {
    const [selectedOptions, setSelectedOptions] = useState([])
    const [showCard, setShowCard] = useState(cardData)
    const [favIcons, setFavIcons] = useState(Favorites)

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

    const changeFavIcons = (e) => {
        if ('favName' in e.target.dataset) {
            if (Favorites.indexOf(e.target.dataset.favName) !== -1) {
                Favorites.splice(Favorites.indexOf(e.target.dataset.favName), 1)
                setFavIcons(prev => prev.filter(item => item !== e.target.dataset.favName))
            } else {
                Favorites.push(e.target.dataset.favName)
                setFavIcons(prev => [...prev, e.target.dataset.favName])
            }
        } else if ('favName' in e.target.parentNode.dataset) {
            if (Favorites.indexOf(e.target.parentNode.dataset.favName) !== -1) {
                Favorites.splice(Favorites.indexOf(e.target.dataset.favName), 1)
                setFavIcons(prev => prev.filter(item => item !== e.target.parentNode.dataset.favName))
            } else {
                Favorites.push(e.target.parentNode.dataset.favName)
                setFavIcons(prev => [...prev, e.target.parentNode.dataset.favName])
            }
        }
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
                                    <Card.Img variant="top" src="/img/Carousel1.jpeg" />
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            favIcons.indexOf(item.title) === -1 ?
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
                                            favIcons.indexOf(item.title) !== -1 ?
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
