import "../../styles/css/index.css";
import { useSelector } from "react-redux";

const Message = (props) => {
    const { informations } = props;

    const { userName } = useSelector(state => state.user);

    const dateMessage = new Date(parseInt(informations.dateMessage));
    const dateString = dateMessage.getHours().toString().padStart(2, 0) + ":" + dateMessage.getMinutes().toString().padStart(2, 0);

    return (
        <>
            <article className={`message ${userName == informations.pseudo ? 'message-our' : ''}`}>
                <div className="message-body">
                    {userName !== informations.pseudo && (
                        <h5 className="message-sender">{ informations.pseudo }</h5>
                    )}
                    <p className="message-content">{ informations.content }</p>
                </div>
                <p className="message-hour">{ dateString }</p>
            </article>
        </>
    );
}

export default Message