import { useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
    const chatId = useParams().chatId;
    const [messages, setMessages] = useState([]);

    const getMessages = async () => {
        
    }

    getMessages();
    

    return (
        <>
            <h1>Chat</h1>
        </>
    );
}

export default Chat;