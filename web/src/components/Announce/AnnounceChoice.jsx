import "../../styles/css/index.css";
import { useNavigate } from "react-router-dom";
import informationsSite from "../../../informations.json";
import { useSelector } from "react-redux";
import Chat from "../../assets/Chat.png";
import { useState } from "react";
import SendMail from '../../assets/Chat.png'

const AnnounceChoice = (props) => {
    const { informations, canApply, canAnswer } = props;
    const { userName, userToken } = useSelector(state => state.user);
    const [seeApply, setSeeApply] = useState(false);
    const [validAsk, setValidAsk] = useState(true);

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

    const answerAsk = async () => {
        const requestOptions = {
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ answer: validAsk, idAsk: informations.idAsk })
        }

        const res = await fetch(informationsSite.urlAPI + "/carPooling/ask/answer", requestOptions);
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
                <span>{informations.currentPassenger}/{informations.maxPlace}</span>
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
            {canAnswer && (
                <div className="announce-choice-applier">
                    <div className="announce-choice-separator"></div>
                    <p className="announce-choice-applier-pseudo">{informations.pseudoApplier}</p>
                    <div className="announce-choice-applier-choice">
                        <button onClick={() => setValidAsk(true)}>
                            {validAsk && <div></div>}
                        </button>
                        
                        <button onClick={() => setValidAsk(false)}>
                            {!validAsk && <div></div>}
                        </button>
                        
                        <button onClick={answerAsk}>
                            <img src={SendMail} alt="Envoyer" />
                        </button>
                    </div>
                </div>
            )}
        </article>
    );
}

export default AnnounceChoice;