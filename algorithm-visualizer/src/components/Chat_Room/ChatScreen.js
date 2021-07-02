import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/fontawesome-free-solid"

let count = 15;

export default function ChatScreen(props) {

    const [typedMessage, setTypedMessage] = useState("")
    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (props.targetComp) {
            let message = props.messageTyped.find(item => item.name === props.targetComp)
            setTypedMessage(message.message)
        }
    }, [props.targetComp])

    useEffect(() => {
        return () => {
            props.targetComp && props.messageTyped.map(item => {
                if (item.name === props.targetComp) {
                    item.message = typedMessage
                }
                return item
            })
        }
    })

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }

    useEffect(() => {
        scrollToBottom()
    }, [typedMessage, props.targetComp]);


    const inputChangeHandler = (e) => {
        setTypedMessage(e.target.value)
    }

    const messageSubmit = (e) => {
        e.preventDefault()
        let newMessage = {
            id: count,
            user: "You",
            text: e.target.childNodes[0].value
        }
        count++;
        setTypedMessage("")
        props.addMessage(newMessage)
    }

    return (
        <div>
            {
                props.targetComp ?
                    <div className="fixedList">
                        <div id="chat-header">
                            {
                                props.isSmall &&
                                <div className="icon">
                                    <FontAwesomeIcon icon={faArrowLeft} onClick={props.changeTargetComp} />
                                </div>
                            }
                            <span id="image">
                                <img src="/img/Carousel1.jpeg" alt="group_photo" />
                            </span>
                            <div className="text-left d-flex align-items-center">
                                <h6>{props.targetComp}</h6>
                            </div>
                        </div>
                        <div id="all-message">
                            {
                                props.messages.map(item =>
                                    (
                                        item.name === props.targetComp &&
                                        item.messages.map(message =>
                                            (
                                                message.user !== "You" ?
                                                    <div className="others-message" key={message.id}>
                                                        <div>{message.text}</div>
                                                    </div>
                                                    :
                                                    <div className="my-message" key={message.id}>
                                                        <div>{message.text}</div>
                                                    </div>
                                            )
                                        )
                                    )
                                )
                            }
                            <div ref={messagesEndRef} />
                        </div>
                        <form className="message" onSubmit={messageSubmit}>
                            <input type="text" id="message-box" placeholder="Type your message..." onChange={inputChangeHandler} value={typedMessage} required />
                            <button type="submit" className="btn btn-primary">Send</button>
                        </form>
                    </div>
                    :
                    <div id="blank-chat">Click any chat to open</div>
            }
        </div>
    )
}