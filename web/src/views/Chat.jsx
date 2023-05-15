import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import informations from "../../informations.json";
import "../styles/css/index.css";
import FormSendMsg from "../components/Chat/FormSendMsg";
import Message from "../components/Chat/Message";
import { sendMessage } from "../Socket/socket.ts";

const Chat = () => {
    const chatId = useParams().chatId;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getMessages = async () => {
            const res = await fetch(informations.urlAPI + "/chat/messages/" + chatId);
            const data = await res.json();
            console.log(data);
            setMessages(data);
        }

        getMessages()
    }, []);
    
    const submitForm = (payload) => {
        console.log(payload);
        sendMessage(payload)
    }

    return (
        <>
            <div className="chat">
                {/* Liste des messages */}
                <div className="messages">
                    {messages.map((message, index) => <Message 
                        key={index}
                        informations={message}
                    />)}
                </div>

                {/* Formulaire pour envoyer un nouveau message */}
                <FormSendMsg newMessage={(payload) => submitForm(payload)} />
            </div>
        </>
    );
}

export default Chat;