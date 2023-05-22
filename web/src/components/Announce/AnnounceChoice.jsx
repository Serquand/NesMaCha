import "../../styles/css/index.css";
import { useNavigate } from "react-router-dom";
import informationsSite from "../../../informations.json";
import { useSelector } from "react-redux";
import Chat from "../../assets/Chat.png";
import { useState, useEffect } from "react";
import SendMail from '../../assets/Chat.png'

const AnnounceChoice = (props) => {
    const { informations, canApply, canAnswer, switchList, removeFromList } = props;
    const { userName, userToken } = useSelector(state => state.user);
    const [seeApply, setSeeApply] = useState(false);
    const [validAsk, setValidAsk] = useState(true);
    const [fromDisplay, setFromDisplay] = useState("");
    const [toDisplay, setToDisplay] = useState("");

    
    useEffect(() => {
        const getAdress = async () => {
            const toRes = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${informations.to.y}&lat=${informations.to.x}`);
            const toData = (await toRes.json()).features[0].properties.name;
            setToDisplay(toData);

            const fromRes = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${informations.from.y}&lat=${informations.from.x}`);
            const fromData = (await fromRes.json()).features[0].properties.name;
            setFromDisplay(fromData);
        }   

        getAdress();
    })

    const date = new Date(parseInt(informations.dateDeparture));
    const dateDisplayed = date.getDate().toString().padStart(2, "0") + "/" + (date.getMonth() + 1).toString().padStart(2, "0") + "/" + date.getFullYear() + " - " + date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0");

    const navigate = useNavigate();

    const goToTheAnnouncementView = () => {
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
        switchList();
    }

    const answerAsk = async () => {
        const requestOptions = {
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ answer: validAsk, idAsk: informations.idAsk })
        }

        const res = await fetch(informationsSite.urlAPI + "/carPooling/ask/answer", requestOptions);
        removeFromList();
    }

    return (
        <article 
            className="announce-choice"
            onClick={goToTheAnnouncementView}
            onMouseEnter={() => setSeeApply(true)}
            onMouseLeave={() => setSeeApply(false)}
        >
            <h5 className="announce-choice-places">
                {fromDisplay}<br />-<br />{toDisplay}
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