import "../../styles/css/index.css";
import { useNavigate } from "react-router-dom";
import informationsSite from "../../../informations.json";
import { useSelector } from "react-redux";
import Chat from "../../assets/Chat.png";
import { useState } from "react";

const AnnounceChoice = (props) => {
    const { informations, canApply } = props;
    const { userName, userToken } = useSelector(state => state.user);
    const [seeApply, setSeeApply] = useState(false);

    // informations.from.diplay = `(${informations.from.x}; ${informations.from.x})`;
    // informations.to.diplay = `(${informations.to.x}; ${informations.to.x})`;
    informations.from.diplay = "30-32 avenue de la République";
    informations.to.diplay = "30-32 avenue de la République";

    informations.date = new Date(parseInt(informations.dateDeparture))
    const date = new Date(1684619827468);
    const dateDisplayed = date.getDate().toString().padStart(2, "0") + "/" + (date.getMonth() + 1).toString().padStart(2, "0") + "/" + date.getFullYear() + " - " + date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0");

    const navigate = useNavigate();

    const goToTheAnnouncementView = () => {
        console.log(informations.idCarPooling);
        navigate("/announce/" + informations.idCarPooling);
    }

    const sendApply = async () => {
        const requestOptions = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userToken
            },
            body: JSON.stringify({
                username: userName,
                idAnnounce: informations.idCarPooling
            })
        }
        const res = await fetch(informationsSite.urlAPI + "/carPooling/ask/apply", requestOptions);
        if(res.ok) {

        } else {
            alert("Fuck")
        }
    }

    return (
        <article 
            className="announce-choice"
            onClick={goToTheAnnouncementView}
            onMouseEnter={() => setSeeApply(true)}
            onMouseLeave={() => setSeeApply(false)}
        >
            <h5 className="announce-choice-places">
                {informations.from.diplay}<br />-<br />{informations.to.diplay}
            </h5>
            <div className="announce-choice-separator"></div>
            <p className="announce-choice-info">
                <span>{dateDisplayed}</span> |&nbsp;
                <span>{informations.maxPlace}/{informations.currentPassenger}</span>
            </p>
            {canApply && (
                <button 
                    className={`announce-choice-apply ${seeApply ? 'announce-choice-apply-visible' : ''}`}
                    onClick={sendApply}
                >
                    <img 
                        src={Chat} 
                        alt="Postuler" 
                        className="announce-choice-apply-img"
                    />
                </button>
            )}
        </article>
    );
}

export default AnnounceChoice;