import algoPic from "../../assets/img/algorithms.jpeg"; 
export default function ChatList({ targetList, activeComp, messages }) {

    const clickedList = (e) => {
        let target = e.target
        if (target.className !== "fixedList") {
            while (target && !("chat" in target.dataset)) {
                target = target.parentNode
            }
            targetList(target.dataset.chat)
        }
    }

    return (
        <div>
            <div className="fixedList" onClick={clickedList}>
                {
                    messages.map(item => {
                        const messageLength = item.messages.length
                        return (
                            activeComp === item.name ?
                                <div className="group-card isActive" data-chat={item.name} key={item.id}>
                                    <span id="image">
                                        <img src={algoPic} alt="group_photo" />
                                    </span>
                                    <div className="text-left">
                                        <span>{item.name}</span>
                                        { messageLength !== 0 &&
                                            <div>{item.messages[messageLength - 1].user}: {item.messages[messageLength - 1].text.substring(0, 20) === item.messages[messageLength - 1].text
                                                                                            ? item.messages[messageLength - 1].text
                                                                                            : item.messages[messageLength - 1].text.substring(0, 20) + '...'}</div>
                                        }
                                    </div>
                                </div>
                                :
                                <div className="group-card" data-chat={item.name} key={item.id}>
                                    <span id="image">
                                        <img src={algoPic} alt="group_photo" />
                                    </span>
                                    <div className="text-left">
                                        <span>{item.name}</span>
                                        { messageLength !== 0 &&
                                            <div>{item.messages[messageLength - 1].user}: {item.messages[messageLength - 1].text.substring(0, 20) === item.messages[messageLength - 1].text
                                                                                            ? item.messages[messageLength - 1].text
                                                                                            : item.messages[messageLength - 1].text.substring(0, 20) + '...'}</div>
                                        }
                                    </div>
                                </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
