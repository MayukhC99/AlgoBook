import { useState, useEffect, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { UserContext } from '../../Context/UserContext'
import ChatList from './ChatList'
import ChatScreen from './ChatScreen'
import './chat.css'

const chatListData = [
    {
        id: 0,
        name: "Basic computation",
        messages: []
    },
    {
        id: 1,
        name: "Dynamic Programming",
        messages: []
    },
    {
        id: 2,
        name: "Greedy Algorithms",
        messages: []
    },
    {
        id: 3,
        name: "Graph Algorithms",
        messages: []
    },
    {
        id: 4,
        name: "Searching Algorithms",
        messages: []
    },
    {
        id: 5,
        name: "Sorting Algorithms",
        messages: []
    },
    {
        id: 6,
        name: "Add-hoc problems",
        messages: []
    }
]

const messageTyped = [
    {
        name: "Basic computation",
        message: ""
    },
    {
        name: "Dynamic Programming",
        message: ""
    },
    {
        name: "Greedy Algorithms",
        message: ""
    },
    {
        name: "Graph Algorithms",
        message: ""
    },
    {
        name: "Searching Algorithms",
        message: ""
    },
    {
        name: "Sorting Algorithms",
        message: ""
    },
    {
        name: "Add-hoc problems",
        message: ""
    }
]

export default function ChatComponent() {

    const { userDetails } = useContext(UserContext)
    const [isSmall, setIsSmall] = useState(false)
    const [targetComp, setTargetComp] = useState('')
    const [messages, setMessages] = useState(chatListData)

    let resize = new ResizeObserver(entries => {
        if (entries[0].contentRect.width < 576) {
            setIsSmall(true)
        } else {
            setIsSmall(false)
        }
    })

    resize.observe(document.querySelector('body'))

    useEffect(() => {
        document.documentElement.style.overflow = "hidden"

        return () => {
            document.documentElement.style.overflow = "auto"
        }
    })

    const targetList = (val) => {
        if (val !== targetComp) {
            setTargetComp(val)
        }
    }

    const addMessage = (message) => {
        setMessages(item => item.map(val => {
            if (val.name === targetComp) {
                val.messages.push(message)
            }
            return val
        })
        )
    }

    const changeTargetComp = () => {
        setTargetComp("")
    }

    return (
        <Container fluid>
            <Row>
                {
                    (!isSmall || targetComp === "") ?
                        <Col className="p-0" sm={6} md={5} lg={4}>
                            <ChatList targetList={targetList} activeComp={targetComp} messages={messages} />
                        </Col>
                        :
                        <Col className="p-0" sm={6} md={7} lg={8}>
                            <ChatScreen userDetails={userDetails} targetComp={targetComp} messages={messages} addMessage={addMessage} messageTyped={messageTyped} isSmall={isSmall} changeTargetComp={changeTargetComp} />
                        </Col>
                }
                {
                    !isSmall &&
                    <Col className="p-0" sm={6} md={7} lg={8}>
                        <ChatScreen userDetails={userDetails} targetComp={targetComp} messages={messages} addMessage={addMessage} messageTyped={messageTyped} isSmall={isSmall} />
                    </Col>
                }
            </Row>
        </Container>
    )
}