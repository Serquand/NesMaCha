import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import informations from "../../informations.json";
import "../styles/css/index.css";
import FormSendMsg from "../components/Chat/FormSendMsg";
import Message from "../components/Chat/Message";
import { sendMessage } from "../Socket/socket.ts";
import WhoIsReceived from "../components/Chat/WhoIsReceived";
import { socket } from "../Socket/socket.ts";

const Chat = () => {
    const chatId = useParams().chatId;
    const [messages, setMessages] = useState([]);
    const [channelName, setChannelName] = useState("");
    const [listUserInChannel, setListUserInChannel] = useState([]);

    useEffect(() => {
        const getMessages = async () => {
            const res = await fetch(informations.urlAPI + "/chat/messages/" + chatId);
            const data = await res.json();
            setMessages(data.listMessages);
            setChannelName(data.nameChannel);
            setListUserInChannel(data.listUserInChannel);
        }

        getMessages()
    }, []);
    
    socket?.on("newInformation", (payload) => {
        if(payload.type == "newMessage" && payload.channelId == chatId) {
            setMessages([...messages, payload.newMessage]);
        }
    })

    const submitForm = (payload) => {
        sendMessage(payload, chatId)
    }

    return (
        <>
            <div  style={{height: "100vh"}} className="chat">
                <WhoIsReceived 
                    nameGroup={channelName} 
                    listPerson={listUserInChannel}
                />

                {/* Liste des messages */}
                <div className="messages">
                    {messages.map((message, index) => 
                    <>
                        <Message 
                            key={index}
                            informations={message} 
                        />
                    </>)}
                </div>

                {/* Formulaire pour envoyer un nouveau message */}
                <FormSendMsg newMessage={(payload) => submitForm(payload)} />
            </div>
        </>
    );
}

export default Chat;