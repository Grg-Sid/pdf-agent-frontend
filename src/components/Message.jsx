import { useState } from "react";
import axios from "axios";

import "./Message.css";

const Message = () => {
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
     
    const onTextChange = (e) => {
        setText(e.target.value);
        setMessage("");
    }

    const onSend = async () => {
        if(text === "") {
            setMessage("Please enter a message");
            return;
        }
        try {
            const res = await axios.post("http://httpbin.org/post", { text: text }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(res.data);
            setText("");
        } catch (err) {
            console.error(err);
            setMessage("Failed to send message");
        }
    }

    return (
        <div className="chat">
            <input type="text" value={text} onChange={onTextChange} placeholder="Enter text" className="textArea"/>
            <button onClick={onSend}>Send</button>
            {message !== "" && <p>{message}</p>}
        </div>
    )
};

export default Message;