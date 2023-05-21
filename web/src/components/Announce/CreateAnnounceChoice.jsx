import "../../styles/css/index.css";
import { useDispatch } from "react-redux";

import { toggleCreateAnnounce } from "../../store/Announce";


const CreateAnnounceChoice = () => {
    const dispatch = useDispatch();


    return (
        <div className="select-chat"  onClick={() => dispatch(toggleCreateAnnounce())}>
            <div className="select-chat-img">
                <p className="select-chat-img-content">+</p>
            </div>
            <div className="select-chat-user">
                <p>Créer une annonce</p>
            </div>
        </div>
    );
}

export default CreateAnnounceChoice;