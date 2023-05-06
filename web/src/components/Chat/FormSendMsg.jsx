import { useRef } from "react";
import Chat from "../../assets/Chat.png"

const FormSendMsg = (props) => {
    const messageRef = useRef();
    const { newMessage } = props;

    const sendMsg = (event) => {
        event.preventDefault();
        newMessage(messageRef.current.value);
    }   

    return (
        <form 
            onSubmit={sendMsg}
            className="chat-form"
        >
            <textarea 
                className="chat-form-textarea" 
                ref={messageRef}
                placeholder="Entrez votre message..." 
                cols={30}
                rows={30}    
            ></textarea>
            <button 
                type="submit"
                className="chat-form-send" 
            >
                <img 
                    src={ Chat } 
                    alt="Envoyer" 
                    className="chat-form-send-content"
                />
            </button>
        </form>
    )
}

export default FormSendMsg;