import "../../styles/css/index.css";
import { useNavigate } from "react-router-dom";

const SelectChat = (props) => {
    const { informations } = props;
    const navigate = useNavigate();

    const goToChat = () => {
        if(informations.id !== 0) navigate("/chat/" + informations.id);
    }

    return (
        <div>
            <article 
                className="select-chat"
                onClick={goToChat}
            >
                <div className="select-chat-img">
                    <p className="select-chat-img-content">
                        {informations.image ?? informations.name.charAt(0).toUpperCase()}
                    </p>
                    {informations.unseenMessage != 0 && (
                        <p className="select-chat-img-unseen">
                            {informations.unseenMessage > 9 ? "9+" : informations.unseenMessage}
                        </p>
                    )}
                </div>
                <div className="select-chat-user">
                    <p>{informations.name}</p>
                </div>
            </article>
        </div>
    )
}

export default SelectChat;