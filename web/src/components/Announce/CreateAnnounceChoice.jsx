import "../../styles/css/index.css";
import { Link } from "react-router-dom";

const CreateAnnounceChoice = () => {
    return (
        <Link to="/createAnnounce" className="select-chat">
            <div className="select-chat-img">
                <p className="select-chat-img-content">+</p>
            </div>
            <div className="select-chat-user">
                <p>Créer une annonce</p>
            </div>
        </Link>
    );
}

export default CreateAnnounceChoice;