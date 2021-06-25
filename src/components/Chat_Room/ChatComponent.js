import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ChatList from './ChatList'
import ChatScreen from './ChatScreen'
import './chat.css'

const chatListData = [
    {
        id: 0,
        name: "Graph Algorithm",
        messages: [
            {
                id: 10,
                user: "Mayukh",
                text: "Hi"
            },
            {
                id: 11,
                user: "You",
                text: "Hello"
            },
            {
                id: 12,
                user: "Udita",
                text: "Hi"
            },
            {
                id: 13,
                user: "Rashmi",
                text: "Hi"
            },
            {
                id: 14,
                user: "You",
                text: "Nice"
            }
        ]
    },
    {
        id: 1,
        name: "Searching Algorithm",
        messages: [
            {
                id: 20,
                user: "Mayukh",
                text: "Hi"
            },
            {
                id: 21,
                user: "You",
                text: "Hello"
            },
            {
                id: 22,
                user: "Udita",
                text: "Hi"
            }
        ]
    },
    {
        id: 2,
        name: "Sorting Algorithm",
        messages: [
            {
                id: 30,
                user: "Mayukh",
                text: "Hi"
            },
            {
                id: 31,
                user: "You",
                text: "Hello"
            },
            {
                id: 32,
                user: "Udita",
                text: "Hi"
            },
            {
                id: 33,
                user: "Rashmi",
                text: "Hi"
            }
        ]
    }
]

const messageTyped = [
    {
        name: "Graph Algorithm",
        message: ""
    },
    {
        name: "Searching Algorithm",
        message: ""
    },
    {
        name: "Sorting Algorithm",
        message: ""
    }
]

export default function ChatComponent() {

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
                            <ChatScreen targetComp={targetComp} messages={messages} addMessage={addMessage} messageTyped={messageTyped} isSmall={isSmall} changeTargetComp={changeTargetComp} />
                        </Col>
                }
                {
                    !isSmall &&
                    <Col className="p-0" sm={6} md={7} lg={8}>
                        <ChatScreen targetComp={targetComp} messages={messages} addMessage={addMessage} messageTyped={messageTyped} isSmall={isSmall} />
                    </Col>
                }
            </Row>
        </Container>
    )
}